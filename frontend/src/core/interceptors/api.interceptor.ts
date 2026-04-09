import { HttpInterceptorFn } from "@angular/common/http";
import { linkServerConvert } from "@shared/lib";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith("/")) {
    const apiReq = req.clone({
      url: linkServerConvert(req.url),
    });
    return next(apiReq);
  }
  return next(req);
};
