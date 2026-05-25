import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { linkServerConvert } from "@shared/lib";
import { catchError, of, retry, tap } from "rxjs";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem("token");
  const router = inject(Router)
  if (!token) {
    const apiReq = req.clone({
      url: linkServerConvert(req.url),
      withCredentials: true,
    });
    return next(apiReq);
  }

  const apiReq = req.clone({
    url: req.url.startsWith("http") ? req.url : linkServerConvert(req.url),
    withCredentials: true,
    setHeaders: {
      Authorization: `Bearer ${token}`,
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
