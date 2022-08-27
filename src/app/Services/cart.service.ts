import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  userId = this.authservice.getuserId();

  _addtocart = `https://bachatbazzar.herokuapp.com/bachatbazzar/cart/users/${this.userId}/cart`;

  _updatecart = `https://bachatbazzar.herokuapp.com/bachatbazzar/cart/users/${this.userId}/cart`;

  _deletecart = `https://bachatbazzar.herokuapp.com/bachatbazzar/cart/users/${this.userId}/cart`;

  _getcart = `https://bachatbazzar.herokuapp.com/bachatbazzar/cart/users/${this.userId}/cart`;


  constructor(private http: HttpClient, private authservice: LoginService) {}


  addtocart(cart: any): Observable<any> {

    return this.http.post<any>(`${this._addtocart}`, cart);

  }


  getcart(): Observable<any> {

    return this.http.get<any>(this._getcart);

  }


  deletecartbyid(cart: any): Observable<any> {

    return this.http.put<any>(this._updatecart, cart);

  }


  deleteall(): Observable<any> {

    return this.http.delete<any>(`${this._deletecart}`);

  }

}
