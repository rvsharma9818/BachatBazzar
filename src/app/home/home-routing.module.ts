import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetaileproductComponent } from '../cart/detaileproduct/detaileproduct.component';
import { DefaultComponent } from '../components/default/default.component';
import { DetailsViewComponent } from '../shop-components/details-view/details-view.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DefaultComponent,
      },
      {
        path: 'home',
        component: DefaultComponent,
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./shop/shop.module').then((m) => m.ShopModule),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'wishlist',
        loadChildren: () =>
          import('./wishlist/wishlist.module').then((m) => m.WishlistModule),
      },
      {
        path: 'detailsproduct/:id', component: DetaileproductComponent
      },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
