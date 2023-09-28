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
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe({
        next: (response: any) => {
          // Here, we are making sure userName and role are string values before setting them in sessionStorage
          const userName = typeof response.userName === 'string' ? response.userName : '';
          const role = typeof response.role === 'string' ? response.role : '';

          if (userName && role) {
            sessionStorage.setItem('userName', userName);
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
    }
  }

}
