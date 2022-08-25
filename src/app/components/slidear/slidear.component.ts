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
  activeSlideIndex = 0;
  slides = [
    {
      textColor: '#fff',
      logo: '',
      title: 'NEW COLLAB: COCA-COLA X TIMEX',
      description: 'Two iconic American brands have come together to celebrate harmony with new watches in our 1971 Unity Collection.',
      backgroundExpanded: `url('/assets/images/slide-1 (2).jpg')`,
      backgroundCollapsed: `url('/assets/images/pexels-karolina-grabowska-4464822.jpg')`,
      ctaText: 'SHOP NOW',
      ctaLink: 'https://adnanhalilovic.com',
    },
    {
      textColor: "#fff",
      logo: "https://us.coca-cola.com/store/media/wysiwyg/coke-morphe.png",
      title: "",
      description: 'Explore our new line of Morphe products burstling with color and attitide, inspired by Cherry Coke.',
      backgroundExpanded: `url('/assets/images/pexels-photo-380782.webp')`,
      backgroundCollapsed: `url('/assets/images/pexels-photo-698163.jpeg')`,
      ctaText: 'DISCOVER',
      ctaLink: 'https://adnanhalilovic.com'
    },
    {
      textColor: "#fff",
      logo: "",
      title: "PERSONALIZE YOUR COKE",
      description: 'With custom bottle designs for every occasion',
      backgroundExpanded: `url('/assets/images/pexels-photo-4049876.webp')`,
      backgroundCollapsed: `url('/assets/images/pexels-ekaterina-bolovtsova-4049942.jpg')`,
      ctaText: 'SHOP NOW',
      ctaLink: 'https://adnanhalilovic.com'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }


}
