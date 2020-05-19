import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  userResponse: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
    // Redirect to dashboard if user already logged in
    if (this.router.url === '/login' && this.authService.loggedIn()) {
        this.router.navigate(['/profile']);
    }
  }

  submit() {
    // On form invalid
    if (!this.loginForm.valid) {
      alert('Please fill all fields');
    } else {
      // On form valid
      const user = this.loginForm.value;
      this.authService.autheticateUser(user).subscribe(data => {
        this.userResponse = data;
        if (this.userResponse.success) {
          this.authService.storeUserData(this.userResponse.token, this.userResponse.user);
          this.router.navigate(['/profile']);
        } else {
          // If login fails navigate back go login page
          this.router.navigate(['/login']);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.loginForm.reset();
  }

}
