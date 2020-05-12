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
import { MaterialModule } from './material.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

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
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
