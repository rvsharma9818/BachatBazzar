import { Component, OnInit } from '@angular/core';
import { PayemntService } from '../Services/payemnt.service';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.scss']
})
export class PayementComponent implements OnInit {

  paymentHandler: any = null;

  success: boolean = false

  failure:boolean = false

  constructor(private checkout: PayemntService) {}

  ngOnInit() {
  }


     paymentstripe(h:any){
      console.log("hhh")
      this.checkout.makePayment(h).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true
        }
        else {
          this.failure = true
        }
      });
    };

}
