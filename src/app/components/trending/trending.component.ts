import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { CartService } from 'src/app/Services/cart.service';
import { NgToastService } from 'ng-angular-popup';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper';
import { WishlistService } from 'src/app/Services/wishlist.service';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);




@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class TrendingComponent implements OnInit {
  productlist: any;
  constructor(
    public productservice: ProductService,
    public cartService: CartService,
    private toast: NgToastService,
    private wishlist:WishlistService


  ) { }
  ngOnInit() {
    this.get()
  }
  get() {
    this.productservice.getproduct().subscribe(
      (res) => {
        this.productlist = res.data;
      },
      (err) => {
      }
    );
  }
  addtocart(productId: any) {
    const obj = {
      "productId": productId
    }
    this.cartService.addtocart(obj).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Product Added Sucessfully',
        duration: 5000,
      });
    }, (err) => {
      this.toast.error({
        detail: 'WARNING',
        summary: 'Something Went Wrong',
        duration: 5000,
      });
    })

  }
  addtowishlist(productId: any) {
    const obj = {
      productId: productId,
    };
    this.wishlist.addtowishlist(obj).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Product Added Sucessfully',
          duration: 5000,
        });
      },
      (err) => {
        this.toast.error({
          detail: 'WARNING',
          summary: 'Something Went Wrong',
          duration: 5000,
        });
      }
    );
  }
}
