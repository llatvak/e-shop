import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { FeaturedItemsComponent } from './components/featured-items/featured-items.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'shop-cart', component: ShopCartComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {roles: 'admin'}},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '', component: FeaturedItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
