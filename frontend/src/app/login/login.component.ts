import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage: string = '';
  userdata: any;

  constructor(
      private builder: FormBuilder,
      private toastr: ToastrService,
      private service: AuthService,
      private router: Router) {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  onSubmit(): void {
    const userName = this.loginForm.value.userName;
    const password = this.loginForm.value.password;

    if (this.loginForm.valid) {
      if (userName && password) {
        this.service.login(userName, password).subscribe({
          next: (response: any) => {
            // Check if response.userName and response.role are strings, and provide default values if they are not
            const userResponse = typeof response.userName === 'string' ? response.userName : '';
            const role = typeof response.role === 'string' ? response.role : '';

            if (userResponse && role) {
              sessionStorage.setItem('userName', userResponse);
              sessionStorage.setItem('role', role);
              this.router.navigate(['']);
            } else {
              this.toastr.error('Unexpected response from the server.');
            }
          },
          error: (error: any) => {
            // Handle login failure here:
            this.toastr.error(error.message || 'Login failed.');
          }
        });
      } else {
        this.toastr.error('Username and password are required.');
      }
    }
  }
}
