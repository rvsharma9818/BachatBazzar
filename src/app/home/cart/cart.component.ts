import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { NgToastService } from 'ng-angular-popup';
import { PayemntService } from 'src/app/Services/payemnt.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartlist: any;
  Total: number = 0
  items: number = 0
  sure:boolean=false
  constructor(public cartservice: CartService, private toast: NgToastService, private checkout: PayemntService) { }

  ngOnInit(): void {
    this.cart();
  }
  cart() {
    this.cartservice.getcart().subscribe((res) => {
      this.cartlist = res.data.items;
      this.Total = res.data.totalPrice
      this.items = res.data.totalItems
    });
  }
  emptycart() {
    this.cartservice.deleteall().subscribe((res) => {
      this.cart();
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Delete All Sucessfully',
        duration: 3000,
      });
    }, (err) => {
      this.toast.error({
        detail: 'WARNING',
        summary: 'Something Went Wrong',
        duration: 5000,
      });
    })
  }
  deletecart(productId: any) {
    const obj = {
      productId: productId,
      removeProduct: 0,
    };
    this.cartservice.deletecartbyid(obj).subscribe(
      (res) => {
        this.cart();
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
  data: any

  paymentstripe() {
    this.checkout.makePayment().subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.data = data
         this.sure=true
      }

    }, (err) => {
      this.toast.error({
        detail: 'WARNING',
        summary: `${err.error.message}`,
        duration: 5000,
      });
    });
  };
falsex(){
  this.sure=false
}
}
