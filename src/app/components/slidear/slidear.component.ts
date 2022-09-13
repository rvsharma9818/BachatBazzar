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
      backgroundExpanded: `url("https://blogapi.s3.us-west-2.amazonaws.com/uploads/9ed5b99c-9101-47bb-ab7a-049ab82e7763-slide-1%20%282%29.jpg")`,
      backgroundCollapsed: `url('https://blogapi.s3.us-west-2.amazonaws.com/uploads/848abc02-0ad8-4350-bb7e-1c0995215163-pexels-karolina-grabowska-4464822.jpg')`,
      ctaText: 'SHOP NOW',
      ctaLink: 'https://adnanhalilovic.com',
    },
    {
      textColor: "#fff",
      logo: "https://us.coca-cola.com/store/media/wysiwyg/coke-morphe.png",
      title: "",
      description: 'Explore our new line of Morphe products burstling with color and attitide, inspired by Cherry Coke.',
      backgroundExpanded: `url('https://blogapi.s3.us-west-2.amazonaws.com/uploads/24384e06-158e-43af-99ab-997e7761c6a8-pexels-photo-380782.webp')`,
      backgroundCollapsed: `url('https://blogapi.s3.us-west-2.amazonaws.com/uploads/aa711577-7d79-4f2f-bfee-d4539508545c-pexels-photo-698163.jpeg')`,
      ctaText: 'DISCOVER',
      ctaLink: 'https://adnanhalilovic.com'
    },
    {
      textColor: "#fff",
      logo: "",
      title: "PERSONALIZE YOUR COKE",
      description: 'With custom bottle designs for every occasion',
      backgroundExpanded: `url('https://blogapi.s3.us-west-2.amazonaws.com/uploads/e862912b-4a47-4d5b-a723-5c454ddb453e-pexels-photo-4049876.webp')`,
      backgroundCollapsed: `url('https://blogapi.s3.us-west-2.amazonaws.com/uploads/d5b7e0c8-5d68-4c3f-836a-7a260099baa4-pexels-ekaterina-bolovtsova-4049942.jpg')`,
      ctaText: 'SHOP NOW',
      ctaLink: 'https://adnanhalilovic.com'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }


}
