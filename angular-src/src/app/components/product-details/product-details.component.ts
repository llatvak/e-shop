import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Item } from 'src/app/item';
import { ActivatedRoute } from '@angular/router';
import {take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  item: Item;
  productDetailForm: FormGroup;

  constructor(private route: ActivatedRoute, private ngZone: NgZone, private formBuilder: FormBuilder) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
    // Get data from detail button click
    this.item = history.state.data;
    this.productDetailForm = this.formBuilder.group({
      size: [null, [Validators.required]]
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    //this.ngZone.onStable.pipe(take(1))
    //    .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
