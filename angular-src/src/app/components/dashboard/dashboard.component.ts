import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../item';
import {MatPaginator} from '@angular/material/paginator';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  faTrash = faTrash;
  resultsLength = 0;
  items: Item[] = [];
  data = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private router: Router,
    private  itemService: ItemService,
  ) { }

  ngAfterViewInit() {
    this.itemService.getItems().subscribe((data) => {
      this.items = data;
      setTimeout(() => this.loadItems(), 500);
    });
  }

  loadItems(): void {
    this.isLoadingResults = false;
    this.resultsLength = this.items.length;
    this.data.data = this.items as any;
    this.data.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  // On log out clear storage and navigate to login page
  onLogoutClick() {
    this.authService.logout();
    console.log('On log out');
    this.router.navigate(['/login']);
    return false;
  }

  deleteClicked(id: string, elm: Item): boolean {
    // Delete item from database and filter deleted item from table
    this.itemService.deleteItem(id).subscribe(data => {
      this.itemService.getItems().subscribe((data2: Item[]) => {
        this.items = this.items.filter(i => i !== elm);
        this.resultsLength = this.items.length;
        this.data = new MatTableDataSource<Item>(this.items);
        this.data.paginator = this.paginator;
      });
    });
    return false;
  }

}
