import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ShopCartItem } from '../../shop-cart-item';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})

export class ShopCartComponent implements OnInit {

  totalCartItems: number;
  totalSum = 0;
  shopCartItems: ShopCartItem[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    const cartIds = localStorage.getItem('cart').split(',');
    this.totalCartItems = cartIds.length;
    // Temp array to store id's and check duplicate id's from
    const tempArray: string[] = [];
    // Fetch all items by id from local storage
    cartIds.forEach((id) => {
      this.itemService.getItem(id).subscribe(data => {
        // If no duplicate values initialize shop cart object with amount to
        // stack duplicate values together
        if (!tempArray.includes(data._id)) {
          tempArray.push(data._id);
          const shopCartItem = {
            id: data._id,
            item: data,
            amount: 1
          };
          // Calculate shop cart items total sum
          const price = shopCartItem.item.price.substring(0, shopCartItem.item.price.length - 1);
          this.totalSum += Number(price);
          this.shopCartItems.push(shopCartItem);
        // If duplicate found loop through and increment that object's amount value
        } else {
          this.shopCartItems.forEach((shopItem) => {
            if (shopItem.id === data._id) {
              shopItem.amount++;
              const price = shopItem.item.price.substring(0, shopItem.item.price.length - 1);
              this.totalSum += Number(price);
            }
          });
        }
      });
    });
    setTimeout(() => console.log(this.shopCartItems), 500);
  }

  // TODO feature
  checkoutClicked(): void {
    alert('Sorry! This feature is under development.');
  }
}
