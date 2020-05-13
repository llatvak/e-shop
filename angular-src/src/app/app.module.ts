import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShopCartComponent } from './components/shop-cart/shop-cart.component';
import { FeaturedItemsComponent } from './components/featured-items/featured-items.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './modules/material.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ShopCartComponent,
    FeaturedItemsComponent,
    ShopItemComponent,
    FooterComponent,
    SearchResultComponent,
    LoginComponent,
    MainNavComponent,
    ProductDetailsComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
