import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { CategoryComponent } from 'src/app/shop-components/category/category.component';
import { DetailsViewComponent } from 'src/app/shop-components/details-view/details-view.component';
import { GridViewsComponent   } from 'src/app/Shop-components/grid-views/grid-views.component';


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
  ]
})
export class ShopModule { }
