import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Register user to database
  registerUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/users/register`, user, {headers});
  }

  // Authenticate user and fetch token if successfull
  autheticateUser(user) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/users/authenticate`, user, {headers});
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
    // Load the JWT-token and add it to headers for backend to authorize
    // and give access to guarded path
    this.loadToken();
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    console.log(headers.getAll('Authorization'));
    return this.http.get(`${this.baseUrl}/users/profile`, {headers});
  }

  // Fetch token form local storage
  loadToken() {
    const token  = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Check if token exists and is not expired
  loggedIn() {
    if (localStorage.getItem('id_token') === undefined) {
      return false;
    } else {
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(localStorage.getItem('id_token'));
    }
  }
}
