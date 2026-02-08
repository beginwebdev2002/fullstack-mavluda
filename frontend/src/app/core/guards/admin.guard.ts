import { inject } from '@angular/core';
import {  CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@entities/user/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }
  
  // If logged in but not admin, redirect to home or forbidden
  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/']);
  }

  return router.createUrlTree(['/auth/login']);
};
