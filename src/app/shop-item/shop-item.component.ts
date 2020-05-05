import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {

  productTitle: string;
  productImageUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
