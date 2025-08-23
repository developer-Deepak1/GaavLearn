import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../commonService/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const token = localStorage.getItem('access_token');
  const allowedRoles: string[] = route.data['roles'];
  if (token) {
    // ✅ User logged in → allow access
    if (allowedRoles && allowedRoles.length > 0) {
      if (!userService.IsPagePermission(allowedRoles)) {
        router.navigate(['/auth/access-denied']);
        return false;
      }
    }
    return true;
  } else {
    // ❌ Not logged in → redirect to login
    router.navigate(['/auth/login']);
    return false;
  }
};
