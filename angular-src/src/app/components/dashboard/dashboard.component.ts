import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../item';
import {MatPaginator} from '@angular/material/paginator';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
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
  data2: Item[] = [];
  data = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private authService: AuthService,
    private router: Router,
    private  itemService: ItemService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    this.itemService.getItems().subscribe((data) => {
      this.data2 = data;
      this.isLoadingResults = false;
      this.resultsLength = this.data2.length;
      this.data.data = data as any;
      this.data.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
    this.data.paginator = this.paginator;
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
        this.data2 = this.data2.filter(i => i !== elm);
        this.resultsLength = this.data2.length;
      });
    });
    return false;
  }

}
