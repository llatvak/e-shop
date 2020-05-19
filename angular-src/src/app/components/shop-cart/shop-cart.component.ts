import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ShopCartItem } from '../../shop-cart-item';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons/';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})

export class ShopCartComponent implements OnInit {

  totalCartItems = 0;
  totalSum = 0;
  shopCartItems: ShopCartItem[] = [];
  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    if (localStorage.getItem('cart') !== null && localStorage.getItem('cart') !== '') {
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
          this.countTotalSum(shopCartItem);
          this.shopCartItems.push(shopCartItem);
        // If duplicate found loop through and increment that object's amount value
        } else {
          this.shopCartItems.forEach((shopItem) => {
            if (shopItem.id === data._id) {
              shopItem.amount++;
              this.countTotalSum(shopItem);
            }
          });
        }
      });
    });
    }
  }

  // Count total price by adding items
  countTotalSum(item: ShopCartItem) {
    const price = item.item.price.substring(0, item.item.price.length - 1);
    this.totalSum += Number(price);
  }

  // TODO feature
  checkoutClicked(): void {
    if (this.totalCartItems !== 0) {
      alert('Sorry! This feature is under development.');
    }
  }

  plusClicked(item: ShopCartItem, i: number): boolean {
    // Receive item, increment value and add to total price
    item.amount++;
    this.totalCartItems++;
    this.countTotalSum(item);
    // Add id to local storage
    return false;
  }

  minusClicked(item: ShopCartItem, i: number): boolean {
    // Decrease amount
    item.amount--;
    // Decrease item amount from total price
    const price = item.item.price.substring(0, item.item.price.length - 1);
    this.totalSum -= Number(price);
    // Decrease cart item count
    this.totalCartItems--;
    // Get all item id's from local storage and save to array
    const strings = localStorage.getItem('cart').split(',');
    // Loop through every array item and check if there are matching id
    for (let j = 0; j < strings.length; j++) {
      // Remove id if it matches item id and update local storage
      if (strings[j] === item.item._id) {
        strings.splice(j, 1);
        localStorage.setItem('cart', strings.toString());
        break;
      }
    }
    // If item amount is 0 remove it from list
    if (item.amount === 0) {
      this.shopCartItems.splice(i, 1);
    }
    return false;
  }
}
