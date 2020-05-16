import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  sub: any;
  page: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(history.state.data);
  }
}
