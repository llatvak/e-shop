import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};
  profileResult: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Fetch user data when logged in
    this.authService.getProfile().subscribe(profile => {
        this.profileResult = profile;
        this.user = this.profileResult.user;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

  // On log out clear storage and navigate to login page
  onLogoutClick() {
    this.authService.logout();
    console.log('On log out');
    this.router.navigate(['/login']);
    return false;
  }

}
