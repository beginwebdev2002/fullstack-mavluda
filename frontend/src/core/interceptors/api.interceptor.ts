import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { linkServerConvert } from "@shared/lib";
import { catchError, of, retry } from "rxjs";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = sessionStorage.getItem("access_token");
  const router = inject(Router);
  console.log('Request URL: ', linkServerConvert(req.url));
  
  
  if (!accessToken) {    
    const apiReq = req.clone({
      url: linkServerConvert(req.url),
      withCredentials: true,
    });
    return next(apiReq);
  }
  // if (req.url.startsWith('/') || req.url.startsWith('http')) {
  //     return next(req);
  // }

  const apiReq = req.clone({
    url: linkServerConvert(req.url),
    withCredentials: true,
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return next(apiReq)
  .pipe(
    retry({
      count: 2,
      delay: 1000,
    }),
    catchError((err) => {
      if (err.status === 401) {
        sessionStorage.removeItem("token");
        router.navigate(["auth/login"]);
      }
      return of()
    }),
    
  )
};
