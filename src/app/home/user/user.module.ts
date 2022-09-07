import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup'

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { OrderComponent } from 'src/app/cart/order/order.component';


@NgModule({
  declarations: [
    UserComponent,
    OrderComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgToastModule
  ]
})
export class UserModule { }
