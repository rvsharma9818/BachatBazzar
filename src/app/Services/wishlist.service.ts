import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  userId = this.authservice.getuserId();

  _addtowishlist = `https://bachatbazzar.herokuapp.com/bachatbazzar/wishlist/users/${this.userId}/wishlist`;

  _updatewishlist = `https://bachatbazzar.herokuapp.com/bachatbazzar/wishlist/users/${this.userId}/wishlist`;

  _deletewishlist = `https://bachatbazzar.herokuapp.com/bachatbazzar/wishlist/users/${this.userId}/wishlist`;

  _getwishlist = `https://bachatbazzar.herokuapp.com/bachatbazzar/wishlist/users/${this.userId}/wishlist`;


  constructor(private http: HttpClient, private authservice: LoginService) {}


  addtowishlist(wishlist: any): Observable<any> {

    return this.http.post<any>(`${this._addtowishlist}`, wishlist);

  }


  getwishlist(): Observable<any> {

    return this.http.get<any>(this._getwishlist);

  }


  deletewishlistbyid(wishlist: any): Observable<any> {

    return this.http.put<any>(this._updatewishlist,wishlist);

  }


  deleteall(): Observable<any> {

    return this.http.delete<any>(`${this._deletewishlist}`);

  }
}
