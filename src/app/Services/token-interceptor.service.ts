import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(LoginService);
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenReq);
  }
}
