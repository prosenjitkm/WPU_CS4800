import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private result: any;

  constructor(
    private builder:FormBuilder,
    private toastr: ToastrService,
    private service:AuthService,
    private router: Router
    ) {
    sessionStorage.clear()
  }

  loginForm = this.builder.group({
    username:this.builder.control('', Validators.compose([Validators.required])),
    password:this.builder.control('', Validators.compose([Validators.required])),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username || '';

      this.service.GetUserByUserName(username).subscribe(
        (response: any) => { // Adjusting the type to 'any'
          // Assuming response is an array, but using 'any' to avoid type conflict
          const user = Array.isArray(response) && response.length > 0 ? response[0] : null;

          if (user) {
            // Comparing the password and checking if the user is active
            if (user.password === this.loginForm.value.password) {
              if (user.isActive == true) {
                sessionStorage.setItem('username', user.username);
                sessionStorage.setItem('role', user.role);
                this.router.navigate(['']);
              } else {
                this.toastr.error('Inactive User. Please contact admin');
              }
            } else {
              this.toastr.error('Invalid credentials');
            }
          } else {
            this.toastr.error('User not found');
          }
        },
        error => {
          // Handle error scenario
          this.toastr.error('Error occurred during login');
        }
      );
    } else {
      this.toastr.error('Form is not valid');
    }
  }
}
