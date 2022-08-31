import {  Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Router} from "@angular/router";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  _registerUrl="https://bachatbazzar.herokuapp.com/bachatbazzar/user/register"
  _loginUrl="https://bachatbazzar.herokuapp.com/bachatbazzar/user/login"

  constructor(private http: HttpClient,
    private router: Router,) { }


  registerUser(registrationInfo: FormData): Observable<any> {
    return this.http.post<any>(this._registerUrl, registrationInfo);
  }

  login(user: any): Observable<any> {

    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/signin'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getuserId(){
    return localStorage.getItem('userId')
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

}
