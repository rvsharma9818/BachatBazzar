import {   OnInit } from '@angular/core';
import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { Autoplay, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation,Autoplay]);

@Component({
  selector: 'app-slidear',
  templateUrl: './slidear.component.html',
  styleUrls: ['./slidear.component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class SlidearComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
