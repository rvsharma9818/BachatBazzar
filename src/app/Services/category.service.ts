import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  userId= this.authservice.getuserId()

    _getcategory =
    'https://bachatbazzar.herokuapp.com/bachatbazzar/categoree/getcategory';

    _addcategory =
    `https://bachatbazzar.herokuapp.com/bachatbazzar/categoree/category/${this.userId}`;

    _getcategorybyid =
    `https://bachatbazzar.herokuapp.com/bachatbazzar/categoree/category/${this.userId}`;

    _updatecategory =
    `https://bachatbazzar.herokuapp.com/bachatbazzar/categoree/updatecategory/${this.userId}`;

    _delcategory =
    `https://bachatbazzar.herokuapp.com/bachatbazzar/categoree/delcategory/${this.userId}`;

    constructor( private http: HttpClient, private authservice:LoginService ) { }


    addcategory(category: any,catId: any): Observable<any> {

      return this.http.post<any>(`${this._addcategory}/${catId}`, category);

    }


    getcategory(): Observable<any> {

      return this.http.get<any>(this._getcategory);

    }


    getproductbyid(): Observable<any> {

      return this.http.get<any>(this._getcategorybyid);

    }


    updateproductbyid(category: any,catId: any): Observable<any> {

      return this.http.put<any>(`${this._updatecategory}/${catId}`, category);

    }


    deleteproduct(catId: any): Observable<any> {

      return this.http.delete<any>(`${this._delcategory}/${catId}`);

    }

}
