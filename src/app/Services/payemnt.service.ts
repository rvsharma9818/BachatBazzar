import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PayemntService {
  userId = this.authservice.getuserId()

  constructor(private http: HttpClient, private authservice: LoginService) { }

  makePayment(): Observable<any> {
    const url = `https://bachatbazzar.herokuapp.com/bachatbazzar/payement/create-checkout-session/${this.userId}`

    return this.http.post<any>(url, {})
  }
}
