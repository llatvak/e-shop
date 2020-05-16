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
    console.log(this.item);
  }

  detailsClicked(): void {
    this.router.navigate(['/product-details'], {state: {data: this.item}});
  }
}
