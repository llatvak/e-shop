import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../item';
import {MatPaginator} from '@angular/material/paginator';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy  {

  isLoadingResults = true;
  faTrash = faTrash;
  resultsLength = 0;
  addForm: FormGroup;
  items: Item[] = [];
  data = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private router: Router,
    private  itemService: ItemService,
    private formBuilder: FormBuilder
  ) { }

  ngAfterViewInit(): void {
    // Fetch all items to display in table
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      setTimeout(() => this.loadItems(), 500);
    });
  }

  // Load items to table
  loadItems(): void {
    this.isLoadingResults = false;
    this.resultsLength = this.items.length;
    this.data.data = this.items as any;
    this.data.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      category: [null, [Validators.required]],
      imageUrl: [null, Validators.required]
    });
  }

  // On log out clear storage and navigate to login page
  onLogoutClick(): boolean {
    this.authService.logout();
    console.log('On log out');
    this.router.navigate(['/login']);
    return false;
  }

  // Delete item from database and filter deleted item from table
  deleteClicked(id: string, elm: Item): boolean {
    this.itemService.deleteItem(id).subscribe(data => {
      this.itemService.getItems().subscribe((data2: Item[]) => {
        this.items = this.items.filter(i => i !== elm);
        this.resultsLength = this.items.length;
        // Refresh data on table and paginator
        this.data = new MatTableDataSource<Item>(this.items);
        this.data.paginator = this.paginator;
      });
    });
    return false;
  }

  // Add item from form values
  submit(): boolean {
    if (this.addForm.valid) {
      this.itemService.addItem(this.addForm.value).subscribe(data => {
        console.log(data);
      });
      this.resetAddFields();
    }
    return false;
  }

  ngOnDestroy(): void {
    this.resetAddFields();
  }

  resetAddFields(): void {
    this.addForm.value.name = '';
    this.addForm.value.price = '';
    this.addForm.value.category = '';
    this.addForm.value.imageUrl = '';
  }

}
