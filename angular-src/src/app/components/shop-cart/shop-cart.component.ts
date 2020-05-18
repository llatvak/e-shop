import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {

  totalCartItems: number;
  cartItems: Item[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    const cartIds = localStorage.getItem('cart').split(',');
    this.totalCartItems = cartIds.length;
    // Fetch all items by id from local storage
    cartIds.forEach((id) => {
      this.itemService.getItem(id).subscribe(data => {
        //if (!this.cartItems.toString().includes(data._id)) {
        //  this.cartItems.push(data);
        //  console.log(this.cartItems.toString());
        //}
      });
    });
  }

}
