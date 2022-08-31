import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})

export class WishlistComponent implements OnInit {

  wishlist: any;
  Total:number=0
  items:number=0
  constructor(public cartService: CartService, private toast: NgToastService,public wishlistService:WishlistService) {}

  ngOnInit(): void {
this.wish();
  }
  wish() {
    this.wishlistService.getwishlist().subscribe((res) => {
      this.wishlist = res.data.items;

    });
  }
  emptycart(){
    this.wishlistService.deleteall().subscribe((res)=>{
     this.wish();
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Delete All Sucessfully',
        duration: 3000,
      });
    },(err)=>{
      this.toast.error({
        detail: 'WARNING',
        summary: 'Something Went Wrong',
        duration: 5000,
      });
    })
  }
  deletewish(productId: any) {
    const obj = {
      productId: productId,
      removeProduct: 0,
    };
    this.wishlistService.deletewishlistbyid(obj).subscribe(
      (res) => {
        this.wish();
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Product Deleted Sucessfully',
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
  addtocart(productId: any) {
    const obj = {
      productId: productId,
      removeProduct: 0,

    };
    this.cartService.addtocart(obj).subscribe(
      (res) => {
        this.wishlistService.deletewishlistbyid(obj).subscribe(
          (res) => {
            this.wish();
          },
          (err) => {
            this.toast.error({
              detail: 'WARNING',
              summary: 'Something Went Wrong',
              duration: 5000,
            });
          }
        );
             this.toast.success({
          detail: 'SUCCESS',
          summary: 'Product Added Sucessfully',
          duration: 5000,
        });
      },
      (err) => {
        console.log(err)
        // this.toast.error({
        //   detail: 'WARNING',
        //   summary: 'Something Went Wrong',
        //   duration: 5000,
        // });
      }
    );
  }
}
