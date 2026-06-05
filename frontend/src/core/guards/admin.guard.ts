import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { SessionService } from "@entities/session";

export const adminGuard: CanActivateFn = (route, state) => {
  const sessionService = inject(SessionService);
  const router = inject(Router);


  if (
    sessionService.isAuthenticated()
    && sessionService.isAdmin()
  ) {
    return true;
  }

  if (sessionService.isAuthenticated()) {
    return router.createUrlTree(["/user/home"]);
  }

  return router.createUrlTree(["/auth/login"]);
};
