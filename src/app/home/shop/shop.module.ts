import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { CategoryComponent } from 'src/app/shop-components/category/category.component';
import { DetailsViewComponent } from 'src/app/shop-components/details-view/details-view.component';
import { GridViewsComponent   } from 'src/app/Shop-components/grid-views/grid-views.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/Services/token-interceptor.service';


@NgModule({
  declarations: [
    ShopComponent,
    DetailsViewComponent,
    GridViewsComponent ,
      CategoryComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
})
export class ShopModule { }
