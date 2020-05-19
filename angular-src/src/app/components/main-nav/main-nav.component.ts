import { Component, OnInit, DoCheck } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faShoppingCart, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, DoCheck {
  faShoppingCart = faShoppingCart;
  faUserCircle = faUserCircle;
  faSearch = faSearch;
  shopCartItemCount = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (localStorage.getItem('cart') !== null && localStorage.getItem('cart') !== '') {
      const cartItems = localStorage.getItem('cart').split(',');
      this.shopCartItemCount = cartItems.length;
    } else {
      this.shopCartItemCount = 0;
    }
  }

  onEnter(): void {
    this.router.navigate(['/search-result']);
  }
}
