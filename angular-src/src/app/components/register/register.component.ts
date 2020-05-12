import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  dataRegister: any = {};
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      password: [null, Validators.required]
    });
  }

  submit() {
    // If fields are not valid
    if (!this.registerForm.valid) {
      return;
    }
    // If all fields valid valid
    console.log(this.registerForm.value);
    const user = this.registerForm.value;

    // Register user
    this.authService.registerUser(user).subscribe(data => {
        this.dataRegister = data;
        if (this.dataRegister.success) {
          console.log('onSuccess');
          this.router.navigate(['/login']);
        } else {
          console.log('onError');
          this.router.navigate(['/register']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.registerForm.value.email = '';
    this.registerForm.value.password = '';
  }

}
