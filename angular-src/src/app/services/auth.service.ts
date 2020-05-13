import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  // Register user to database
  registerUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers});
  }

  // Authenticate user and fetch token if successfull
  autheticateUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers});
  }

  // Store user and token
  storeUserData(token, user) {
    // Angular-JWT look for id_token key when validating token
    localStorage.setItem('id_token', token);
    // Parse user from JSON format to string so it can be saved to local storage
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // Reset data on logout
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  // Get profile data for dashboard
  getProfile() {
    let headers: HttpHeaders = new HttpHeaders();
    this.loadToken();
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    console.log(headers.getAll('Authorization'));
    return this.http.get('http://localhost:3000/users/profile', {headers});
  }

  // Fetch token form local storage
  loadToken() {
    const token  = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
