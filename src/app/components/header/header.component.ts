import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: number = 0;
  wishlist: number = 0;
  constructor(
    public cartservice: CartService,
    public wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.cart();
      this.wish();
    }, 1000);
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
