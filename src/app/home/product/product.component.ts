import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

p:number=1
  apiData:any
  limit: number = 20;
  constructor(
    private readonly http: HttpClient,
  ) {}
  ngOnInit() {
    this.fetch()
  }


  fetch() {
    const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    const http$ = this.http.get<any>(api);

    http$.subscribe(
      (res) =>{ this.apiData = res
        console.log(res)
      },
      err => throwError(err)
    )
  }

}
