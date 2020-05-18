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
    return this.http.get<Item[]>(url);
  }

  // Fetch one item
  getItem(id: string): Observable<Item> {
    const url = this.baseUrl + `items/${id}`;
    return this.http.get<Item>(url);
  }

  // Delete one item
  deleteItem(id: string): Observable<Item> {
    const url = this.baseUrl + `items/${id}`;
    return this.http.delete<Item>(url);
  }

  // Add one item
  addItem(newItem: Item): Observable<Item> {
    const url = this.baseUrl + 'items';
    return this.http.post<Item>(url, newItem);
  }
}
