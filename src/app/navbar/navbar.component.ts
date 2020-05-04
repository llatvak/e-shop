import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

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
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
  }

  onEnter(): void {
    this.router.navigate(['/search-result']);
  }

}
