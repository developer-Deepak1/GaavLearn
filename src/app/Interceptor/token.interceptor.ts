import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../commonService/user.model';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const baseUrl = environment.baseUrl;

  const token = localStorage.getItem('access_token');
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      // If Unauthorized, try to refresh token
      if (error.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          // No refresh token → logout
          localStorage.clear();
          return throwError(() => error);
        }

        // Call refresh API
        return http.post<LoginResponse>(
          `${baseUrl}/refresh-token`,
          { refresh_token: refreshToken }
        ).pipe(
          switchMap((res) => {
            // Save new tokens
            localStorage.setItem('access_token', res.token);
            localStorage.setItem('refresh_token', res.refresh_token);

            // Retry the original request with new token
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.token}`
              }
            });
            return next(clonedReq);
          }),
          catchError((refreshError) => {
            // If refresh fails → logout
            localStorage.clear();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
