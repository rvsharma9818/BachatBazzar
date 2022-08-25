import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { YoumaylikeusComponent } from 'src/app/components/youmaylikeus/youmaylikeus.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    ProductComponent,
    YoumaylikeusComponent,

    ],
    imports: [
    CommonModule,
    ProductRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    SwiperModule,
    CarouselModule,
  ]
})
export class ProductModule { }
