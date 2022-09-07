import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  userId = this.authservice.getuserId();

  _createorder = `https://bachatbazzar.herokuapp.com/bachatbazzar/order/users/${this.userId}/orders`;

  _getuserorder = `https://bachatbazzar.herokuapp.com/bachatbazzar/order/users/${this.userId}/getorder`;

  _getorderbyid = `https://bachatbazzar.herokuapp.com/bachatbazzar/order/users/${this.userId}/getorderbyid`;

  _cancelorder = `https://bachatbazzar.herokuapp.com/bachatbazzar/order/users/${this.userId}/orders`;

  _allorder = `https://bachatbazzar.herokuapp.com/bachatbazzar/order/users/${this.userId}/getorders`;

  _deleteorder = `https://bachatbazzar.herokuapp.com/bachatbazzar/order/users/${this.userId}/orders`;

  constructor(private http: HttpClient, private authservice: LoginService) {}

  createorder(s: any): Observable<any> {
    return this.http.post<any>(this._createorder, s);
  }

  getorder(): Observable<any> {
    return this.http.get<any>(this._getuserorder);
  }

  getorderbyid(orderId: any): Observable<any> {
    return this.http.get<any>(this._getorderbyid, orderId);
  }

  allorder(): Observable<any> {
    return this.http.get<any>(this._allorder);
  }

  cancelorder(orderId: any): Observable<any> {
    return this.http.put<any>(`${this._cancelorder}`, orderId);
  }

  deleteorder(orderId:any): Observable<any> {
    return this.http.delete<any>(`${this._deleteorder}/${orderId}`);
  }
}
