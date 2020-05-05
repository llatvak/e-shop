import { Component, OnInit } from '@angular/core';
import { ShopItemComponent } from '../shop-item/shop-item.component';

@Component({
  selector: 'app-featured-items',
  templateUrl: './featured-items.component.html',
  styleUrls: ['./featured-items.component.css']
})
export class FeaturedItemsComponent implements OnInit {

  featuredShopItems: ShopItemComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
