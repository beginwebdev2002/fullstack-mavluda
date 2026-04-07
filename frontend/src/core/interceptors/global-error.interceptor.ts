import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
// Assuming a hypothetical ErrorService exists. Alternatively, use a UI library's Toast service.
import { ErrorService } from '@shared/services/error.service';

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error instanceof ErrorEvent) {
        // Client-side or network error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Backend returns an unsuccessful response code
        if (error.status >= 400 && error.status < 500) {
            errorMessage = `Client Error (${error.status}): ${error.message}`;
        } else if (error.status >= 500) {
            errorMessage = `Server Error (${error.status}): ${error.message}`;
        }
      }

      errorService.showError(errorMessage); // Assuming showError method shows a Toast
      return throwError(() => error);
    })
  );
};
