import { Component, OnInit } from '@angular/core';
import { ShopItemComponent } from '../shop-item/shop-item.component';
import { ItemService } from '../../services/item.service';
import { Item } from '../../item';

@Component({
  selector: 'app-featured-items',
  templateUrl: './featured-items.component.html',
  styleUrls: ['./featured-items.component.css']
})
export class FeaturedItemsComponent implements OnInit {

  featuredShopItems: Item[];
  shopItem: Item;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    // Fetch all items and assign to local variable
    this.itemService.getItems()
      .subscribe(data => {
        this.featuredShopItems = data;
        console.log(this.featuredShopItems);
    });
  }
}
