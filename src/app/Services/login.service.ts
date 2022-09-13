import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _registerUrl = "https://bachatbazzar.herokuapp.com/bachatbazzar/user/register"
  _loginUrl = "https://bachatbazzar.herokuapp.com/bachatbazzar/user/login"
  _userdetails = `https://bachatbazzar.herokuapp.com/bachatbazzar/user/user/${this.getuserId()}/profile`
  constructor(private http: HttpClient,
    private router: Router,) { }


  registerUser(registrationInfo: FormData): Observable<any> {
    return this.http.post<any>(this._registerUrl, registrationInfo);
  }

  login(user: any): Observable<any> {

    return this.http.post<any>(this._loginUrl, user);
  }
  getuserdetails(): Observable<any> {
    return this.http.get<any>(this._userdetails)
  }
  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login/signin'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getuserId() {
    return localStorage.getItem('userId')
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

}
