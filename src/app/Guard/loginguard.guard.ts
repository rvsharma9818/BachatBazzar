import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginguardGuard implements CanActivate {
  constructor(private _authService: LoginService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true

    } else {
      this._router.navigate(['/login/signin'])
      return false
    }
  }




}
