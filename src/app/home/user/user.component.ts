import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/Services/login.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userdetails: any
  constructor(public userservice: LoginService,public orderservice:OrderService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.userservice.getuserdetails().subscribe((res) => {
      this.userdetails = res.data
    }, err => {
      console.log(err)
    })

  }
update(){
  this.toast.error({
    detail: 'WARNING',
    summary: `Currently Featue is not available`,
    duration: 5000,
  });

}
}
