import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faUserCircle = faUserCircle;
  faSearch = faSearch;
  shopCartItemCount = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
