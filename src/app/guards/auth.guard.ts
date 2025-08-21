import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (token) {
    // ✅ User logged in → allow access
    return true;
  } else {
    // ❌ Not logged in → redirect to login
    router.navigate(['/auth/login']);
    return false;
  }
};
