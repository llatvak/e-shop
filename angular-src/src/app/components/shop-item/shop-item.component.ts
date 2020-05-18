import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {
  // Get these from featured-items
  productTitle: string;
  productImageUrl: string;
  @Input() item: Item;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  detailsClicked(): void {
    // Route to details and add data
    this.router.navigate([`/product-details/${this.item._id}`], {state: {data: this.item}});
  }

  addCartClicked(item: Item): void {
    const cartItems: string[] = [];
    cartItems.push(item._id);
    if (localStorage.getItem('cart') !== null) {
      console.log(localStorage.getItem('cart'));
      cartItems.push(localStorage.getItem('cart'));
    }
    localStorage.setItem('cart', cartItems.toString());
  }
}
