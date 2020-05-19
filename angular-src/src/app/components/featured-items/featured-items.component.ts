import { Component, OnInit, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../item';
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
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Fetch all items and assign to local variable
    this.itemService.getItems()
      .subscribe(data => {
        this.featuredShopItems = data;
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
