import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ErrorService } from "@shared/services";

export const globalErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = "An unexpected error occurred";

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        message = `Client Error: ${error.error.message}`;
      } else {
        // Backend error
        if (error.status === 0) {
          message = "Network error. Please check your internet connection.";
        } else if (error.status === 400) {
          // Check for Veil/NestJS validation array
          if (Array.isArray(error.error.message)) {
            message = error.error.message.join("\n");
          } else if (typeof error.error.message === "string") {
            message = error.error.message;
          } else {
            message = "Bad Request";
          }
        } else if (error.status === 401) {
          message = "Unauthorized. Please login again.";
        } else if (error.status === 403) {
          message =
            "Forbidden. You do not have permission to access this resource.";
        } else if (error.status === 404) {
          message = "Resource not found.";
        } else if (error.status >= 500) {
          message = "Server error. Please try again later.";
        }
      }

      errorService.showError(message, error.status);
      return throwError(() => error);
    }),
  );
};
