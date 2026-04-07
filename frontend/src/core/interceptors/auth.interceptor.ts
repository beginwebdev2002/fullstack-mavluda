import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';
import { Router } from '@angular/router';

// This is a basic implementation of the auth interceptor.
// It assumes that the token is stored in localStorage.
// You will need a more robust refresh token implementation that doesn't cause infinite loops.

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let authReq = req;

  // We should not attempt to access localStorage if it is not available (e.g. in SSR).
  if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // In a real application, you might want to call a refresh token endpoint here.
      if (error.status === 401) {
        // If the token is invalid, log out the user and redirect to the login page.
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('role');
        }
        router.navigate(['/admin/login']);
      }
      return throwError(() => error);
    })
  );
};
