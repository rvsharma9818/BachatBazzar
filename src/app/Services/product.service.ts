import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  userId= this.authservice.getuserId()
   _getProducturl=`https://bachatbazzar.herokuapp.com/bachatbazzar/product/products`

   _getproducturlbyid=`https://bachatbazzar.herokuapp.com/bachatbazzar/product/products`

   _postproduct=`https://bachatbazzar.herokuapp.com/bachatbazzar/product/products/${this.userId}`

   _updateproducturl=`https://bachatbazzar.herokuapp.com/bachatbazzar/product/products/${this.userId}/6304f22ad4ed4711edf6d8aa`

   _deleteproduct=`https://bachatbazzar.herokuapp.com/bachatbazzar/product/products/${this.userId}/6304f22ad4ed4711edf6d8aa`

  constructor(private http: HttpClient,private authservice:LoginService) { }


  postproduct(product: any,productId: any): Observable<any> {
    return this.http.post<any>(`${this._postproduct}/${productId}`, product);
  }

  getproduct(): Observable<any> {
    return this.http.get<any>(this._getProducturl);
  }

  getproductbyid(id:any): Observable<any> {
    return this.http.get<any>(`${this._getproducturlbyid}/${id}`);
  }

  updateproductbyid(product: any,productId: any): Observable<any> {
    return this.http.put<any>(`${this._updateproducturl}/${productId}`, product);
  }

  deleteproduct(productId: any): Observable<any> {
    return this.http.delete<any>(`${this._deleteproduct}/${productId}`);
  }


}


