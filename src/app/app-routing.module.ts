import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'shop-cart', component: ShopCartComponent },
  { path: 'search-result', component: SearchResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
