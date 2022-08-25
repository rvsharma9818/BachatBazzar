import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);


@Component({
  selector: 'app-youmaylikeus',
  templateUrl: './youmaylikeus.component.html',
  styleUrls: ['./youmaylikeus.component.scss'],


})
export class YoumaylikeusComponent implements OnInit {
  p:number=1

  constructor(
    private readonly http: HttpClient,
  ) {}
  ngOnInit() {
    this.fetch()
  }

  apiData:any
  limit: number = 10;


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
