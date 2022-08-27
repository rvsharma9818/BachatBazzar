import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/Services/token-interceptor.service';
import { EmptyComponent } from 'src/app/cart/empty/empty.component';


@NgModule({
  declarations: [
    CartComponent,
    EmptyComponent

  ],
  imports: [
    CommonModule,
    CartRoutingModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
})
export class CartModule { }
