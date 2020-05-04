import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Routes, RouterModule, Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onEnter(): void {
    this.router.navigate(['/search-result']);
  }

}
