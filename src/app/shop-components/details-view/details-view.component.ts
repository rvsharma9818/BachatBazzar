import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss'],
})
export class DetailsViewComponent implements OnInit {
  p: number = 1;
  productlist: any;
  id: any='';
  constructor(
    public productservice: ProductService,
    public cartService: CartService,
    private toast: NgToastService,
    private wishlist: WishlistService
  ) {}
  ngOnInit() {
    this.get(1);
  }
  get(page: number) {
    this.p = page;

    this.productservice.getproduct().subscribe(
      (res) => {
        this.productlist = res.data;
      },
      (err) => {}
    );
  }
  catid(data: any) {
    this.id = data;
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
