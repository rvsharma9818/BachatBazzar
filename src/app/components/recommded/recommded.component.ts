import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import SwiperCore, { Pagination, Navigation, Virtual } from 'swiper';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Virtual]);

@Component({
  selector: 'app-recommded',
  templateUrl: './recommded.component.html',
  styleUrls: ['./recommded.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecommdedComponent implements OnInit {
  productlist: any;
  constructor(
    public productservice: ProductService,
    public cartService: CartService,
    private toast: NgToastService,
    private wishlist:WishlistService

  ) {}
  ngOnInit() {
    this.get();
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
      productId: productId,
    };
    this.cartService.addtocart(obj).subscribe(
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
