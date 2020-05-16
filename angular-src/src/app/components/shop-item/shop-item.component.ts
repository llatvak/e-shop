import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../item';

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

  constructor() { }

  ngOnInit(): void {
    console.log(this.item);
  }

}
