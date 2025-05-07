import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // L’utilisateur est connecté : on autorise l’accès
    return true;
  }

  // Sinon on redirige vers le login et on bloque l’accès
  router.navigate(['/login']);
  return false;
};
