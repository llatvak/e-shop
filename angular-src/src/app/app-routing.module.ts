import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ShopItemComponent } from './shop-item/shop-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'shop-cart', component: ShopCartComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: '**', redirectTo: '', component: ShopItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
