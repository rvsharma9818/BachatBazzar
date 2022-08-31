import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detaileproduct',
  templateUrl: './detaileproduct.component.html',
  styleUrls: ['./detaileproduct.component.scss']
})
export class DetaileproductComponent implements OnInit {
  productlist: any;
  pid:any;
  constructor(
    public productservice: ProductService,
    public cartService: CartService,
    private toast: NgToastService,
    private wishlist:WishlistService,
    private route: ActivatedRoute
  ) {
    this.pid= this.route.snapshot.paramMap.get('id')
  }
  ngOnInit() {
    this.get()
  }
  get() {
    this.productservice.getproductbyid(this.pid).subscribe(
      (res) => {
        this.productlist = res.data;
        console.log(res)
      },
      (err) => {
        console.log(err)
        this.toast.error({
          detail: 'WARNING',
          summary: 'Something Went Wrong',
          duration: 5000,
        });
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
