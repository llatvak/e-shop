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
  some: Some[] = [];

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    const cartIds = localStorage.getItem('cart').split(',');
    this.totalCartItems = cartIds.length;
    const tempArray: string[] = [];
    // Fetch all items by id from local storage
    cartIds.forEach((id, index) => {
      this.itemService.getItem(id).subscribe(data => {
        // Check for duplicate values
        if (!tempArray.includes(data._id)) {
          tempArray.push(data._id);
          this.cartItems.push(data);
          const tempObject = {
            id: data._id,
            item: data,
            amount: 1
          };
          this.some.push(tempObject);
        } else {
          this.some.forEach((c) => {
            if (c.id === data._id) {
              c.amount++;
            }
          });
        }
      });
    });
    setTimeout(() => console.log(this.some), 500);
  }

}

export interface Some {
  id: string;
  item: Item;
  amount: number;
}
