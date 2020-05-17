import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../item';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit  {

  isLoadingResults = true;
  isRateLimitReached = false;
  faTrash = faTrash;
  resultsLength = 0;
  data: any = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private router: Router,
    private  itemService: ItemService
  ) { }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = this.data.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  ngOnInit(): void {
    this.itemService.getItems().subscribe(data => {
      this.data = data;
    });
  }

  // On log out clear storage and navigate to login page
  onLogoutClick() {
    this.authService.logout();
    console.log('On log out');
    this.router.navigate(['/login']);
    return false;
  }

  deleteClicked(): void {
    console.log('Delete item');
  }

}
