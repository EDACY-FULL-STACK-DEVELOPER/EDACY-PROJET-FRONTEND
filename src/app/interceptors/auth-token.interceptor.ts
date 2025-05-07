import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();
  if (token && !req.url.includes('/api/auth/')) {
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`  
      }
    }));
  }
  
  return next(req);
};
