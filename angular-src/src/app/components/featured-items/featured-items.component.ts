import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../item';
import { MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-featured-items',
  templateUrl: './featured-items.component.html',
  styleUrls: ['./featured-items.component.css']
})
export class FeaturedItemsComponent implements OnInit, AfterViewInit, OnDestroy {

  featuredShopItems: Item[];
  shopItem: Item;
  private mediaSub: Subscription;

  constructor(
    private itemService: ItemService,
    private cdRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.asObservable().subscribe(change => {
      change.forEach((v) => {
        console.log(v.mediaQuery, v.mqAlias);
      });
      console.log('_______');
    });
    // Fetch all items and assign to local variable
    this.itemService.getItems()
      .subscribe(data => {
        this.featuredShopItems = data;
        console.log(this.featuredShopItems);
    });
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.mediaSub) {
      this.mediaSub.unsubscribe();
    }
  }
}
