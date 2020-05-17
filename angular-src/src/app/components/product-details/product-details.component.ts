import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Item } from 'src/app/item';
import { ActivatedRoute, Router } from '@angular/router';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  item: Item;
  productDetailForm: FormGroup;
  itemId: string;

  constructor(
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private router: Router,
    private itemService: ItemService
    ) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      console.log(this.itemId);
      this.itemService.getItem(this.itemId)
        .subscribe( data => {
          console.log(data);
          this.item = data;
          this.productDetailForm = this.formBuilder.group({
            size: [null, [Validators.required]]
          });
      }, err => {
        this.router.navigate(['/']);
      });
    }, err => {
      console.log(err);
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    //this.ngZone.onStable.pipe(take(1))
    //    .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
