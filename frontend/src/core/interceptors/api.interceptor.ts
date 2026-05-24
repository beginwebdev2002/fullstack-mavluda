import { HttpInterceptorFn } from "@angular/common/http";
import { linkServerConvert } from "@shared/lib";
import { retry } from "rxjs";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem("token");
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
    })
  )
};
