import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  // On log out clear storage and navigate to login page
  onLogoutClick() {
    this.authService.logout();
    console.log('On log out');
    this.router.navigate(['/login']);
    return false;
  }

}
