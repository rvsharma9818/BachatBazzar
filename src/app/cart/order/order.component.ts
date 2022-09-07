import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderlist: any;
  constructor(public orderservice: OrderService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getOrder()
  }
  getOrder() {
    this.orderservice.getorder().subscribe((res) => {
      this.orderlist = res.data
    }, (err) => {
      this.toast.error({
        detail: 'Error',
        summary: 'Something Went Wrong',
        duration: 3000,
      });

    })
  }
  cancelorder(orderid: any) {
    const obj = {
      orderId: orderid
    }
    this.orderservice.cancelorder(obj).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Order Cancel Sucessfully',
        duration: 3000,
      });
      this.getOrder()
    }, (err) => {
      this.toast.error({
        detail: 'Error',
        summary: `${err.error.message}`,
        duration: 3000,
      });
    })
  }
deleteorder(orderId: any){
  this.orderservice.deleteorder(orderId).subscribe((res)=>{
    this.toast.success({
      detail: 'SUCCESS',
      summary: 'Order delete Sucessfully',
      duration: 3000,
    });
    this.getOrder()
  },err=>{
    console.log(err)
    this.toast.error({
      detail: 'Error',
      summary: `${err.error.message}`,
      duration: 3000,
    });
  })
}

}
