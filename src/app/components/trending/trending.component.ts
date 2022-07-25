import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);


export interface PhotosApi {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
}

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class TrendingComponent implements OnInit {
  apiData:any
  limit: number = 10;
  constructor(
    private readonly http: HttpClient,
  ) {}
  ngOnInit() {
    this.fetch()
  }


  fetch() {
    const api = `https://jsonplaceholder.typicode.com/albums/1/photos?_start=0&_limit=${this.limit}`;
    const http$ = this.http.get<PhotosApi>(api);

    http$.subscribe(
      (res) =>{ this.apiData = res
        console.log(res)
      },
      err => throwError(err)
    )
  }
}
