import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PayemntService {
  userId= this.authservice.getuserId()

  constructor(private http: HttpClient,private authservice:LoginService) { }

  makePayment(h: any): Observable<any>{
    const url = `http://localhost:3000/bachatbazzar/payement/checkout/${this.userId}`

    return this.http.post<any>(url,h)
  }
}
