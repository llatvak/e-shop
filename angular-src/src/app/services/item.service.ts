import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Item } from '../item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // Fetch all items
  getItems(): Observable<Item[]> {
    const url = this.baseUrl + 'items';
    console.log(url);
    return this.http.get<Item[]>(url);
  }

  // Fetch one item
  getItem(id: string): Observable<Item> {
    const url = this.baseUrl + `items/${id}`;
    console.log(url);
    return this.http.get<Item>(url);
  }

  // Delete one item
  deleteItem(id: string): Observable<Item> {
    const url = this.baseUrl + `items/${id}`;
    console.log(url);
    return this.http.delete<Item>(url);
  }
}
