import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/Services/cart.service';
import { LoginService } from 'src/app/Services/login.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: number = 0;
  wishlist: number = 0;
  username:string="Profile"
  profile:any
  constructor(
    public cartservice: CartService,
    public wishlistService: WishlistService,
    public userservice:LoginService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.cart();
      this.wish();
    }, 1000);
    this.userservice.getuserdetails().subscribe((res)=>{
this.username= res.data.name.split(" ")[0],
this.profile = res.data.profile
    },err=>{

    })
  }
  wish() {
    this.wishlistService.getwishlist().subscribe((res) => {
      this.wishlist = res.data.totalItems;
    });
  }
  cart() {
    this.cartservice.getcart().subscribe((res) => {
      this.items = res.data.totalItems;
    });
  }
}
