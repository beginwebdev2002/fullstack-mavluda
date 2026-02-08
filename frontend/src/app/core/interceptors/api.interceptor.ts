import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/')) {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    let headers = req.headers;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const apiReq = req.clone({
      url: `${environment.apiUrl}${req.url}`,
      headers
    });
    return next(apiReq);
  }
  return next(req);
};
