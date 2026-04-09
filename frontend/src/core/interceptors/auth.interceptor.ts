import { HttpInterceptorFn, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@entities/user';

let isRefreshing = false;
let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const authService = inject(AuthService);
  let authReq = req;

  if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
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
      if (error.status === 401) {
        if (req.url.includes('/auth/refresh') || req.url.includes('/auth/login')) {
           authService.logout();
           if (router.url.includes('/admin')) {
             router.navigate(['/admin/login']);
           } else {
             router.navigate(['/auth']);
           }
           return throwError(() => error);
        }

        if (!isRefreshing) {
          isRefreshing = true;
          refreshTokenSubject.next(null);

          return http.post<{access_token: string}>('/auth/refresh', {}, { withCredentials: true }).pipe(
            switchMap((response: any) => {
              isRefreshing = false;
              localStorage.setItem('token', response.access_token);
              refreshTokenSubject.next(response.access_token);
              return next(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.access_token}`
                }
              }));
            }),
            catchError((err) => {
              isRefreshing = false;
              authService.logout();
              if (router.url.includes('/admin')) {
                router.navigate(['/admin/login']);
              } else {
                router.navigate(['/auth']);
              }
              return throwError(() => err);
            })
          );
        } else {
          return refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
              return next(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${jwt}`
                }
              }));
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};
