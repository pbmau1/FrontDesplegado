import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const seguridadGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const helper = new JwtHelperService();

  const token = sessionStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if (helper.isTokenExpired(token)) {
    sessionStorage.clear();
    router.navigate(['/login']);
    return false;
  }

  return true;
};
