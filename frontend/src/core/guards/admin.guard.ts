import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // Add actual role check here when auth service is connected
  const role = localStorage.getItem('role');
  if (role === 'admin') {
    return true;
  }
  return router.parseUrl('/admin/login');
};
