import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);
@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class NewArrivalsComponent implements OnInit {
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
