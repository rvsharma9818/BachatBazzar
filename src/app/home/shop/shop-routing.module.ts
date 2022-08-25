import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsViewComponent } from 'src/app/shop-components/details-view/details-view.component';
import { GridViewsComponent } from 'src/app/Shop-components/grid-views/grid-views.component';
import { ShopComponent } from './shop.component';

const routes: Routes = [{ path: '', component: ShopComponent , children:[
  {
    path:'',component:GridViewsComponent
  },
  {
    path:'grid',component:GridViewsComponent
  },
  {
    path:"details",component:DetailsViewComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
