import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { CategoryComponent } from '../../shop-components/category/category.component';
import { DetailsViewComponent } from 'src/app/shop-components/details-view/details-view.component';
import { GridViewsComponent   } from 'src/app/Shop-components/grid-views/grid-views.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/Services/token-interceptor.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterbycatPipe } from 'src/app/Pipes/filterbycat.pipe';

@NgModule({
  declarations: [
    ShopComponent,
    DetailsViewComponent,
    GridViewsComponent ,
       CategoryComponent,
       FilterbycatPipe,

  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    NgxPaginationModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
})
export class ShopModule { }
