import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardComponent } from '../components/card/card.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { OffercountodownComponent } from '../components/offercountodown/offercountodown.component';
import { TestimonalSlidearComponent } from '../components/testimonal-slidear/testimonal-slidear.component';
import { SlidearComponent } from '../components/slidear/slidear.component';
import { SwiperModule } from 'swiper/angular';
import { BannerComponent } from '../components/banner/banner.component';
import { CountdownComponent } from '../components/countdown/countdown.component';
import { RecommdedComponent } from '../components/recommded/recommded.component';
import { NewArrivalsComponent } from '../components/new-arrivals/new-arrivals.component';
import { PartnerComponent } from '../components/partner/partner.component';
import { TrendingComponent } from '../components/trending/trending.component';
import { HttpClientModule } from '@angular/common/http';
import { DefaultComponent } from '../components/default/default.component';

@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    OffercountodownComponent,
    TestimonalSlidearComponent,
    SlidearComponent,
    CountdownComponent,
    RecommdedComponent,
    BannerComponent,
    TrendingComponent,
    NewArrivalsComponent,
    PartnerComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    SwiperModule,
    HttpClientModule,

  ],
})
export class HomeModule {}
