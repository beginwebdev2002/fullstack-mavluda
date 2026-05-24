import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@entities/user";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (
    authService.isLoggedIn()
    && authService.isAdmin()
  ) {
    return true;
  }

  if (authService.isLoggedIn()) {
    return router.createUrlTree(["/user/home"]);
  }

  return router.createUrlTree(["/auth/login"]);
};
