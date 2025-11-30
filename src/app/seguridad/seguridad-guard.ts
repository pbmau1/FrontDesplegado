import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login-service';

export const seguridadGuardGuard: CanActivateFn = (route, state) => {
  const lService=inject(LoginService)
    const router=inject(Router)
    const rpta=lService.verificar();
    if(!rpta){
      router.navigate(['/login']);
      return false;
    }
    return rpta;
};
