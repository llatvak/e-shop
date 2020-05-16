import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  itemDetails: Item;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get data from detail button click
    this.itemDetails = history.state.data;
  }
}
