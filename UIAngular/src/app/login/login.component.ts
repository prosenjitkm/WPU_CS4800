/*login.component.ts*/

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
    userName:this.builder.control('', Validators.compose([Validators.required])),
    password:this.builder.control('', Validators.compose([Validators.required])),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.userName || '';

      this.service.getUserByUserName(username).subscribe(
        (response: any) => {
          const user = Array.isArray(response) && response.length > 0 ? response[0] : null;
          if (user) {
            if (user.password === this.loginForm.value.password) {
              if (user.isActive == true) {
                sessionStorage.setItem('userName', user.userName);
                sessionStorage.setItem('userCategory', user.userCategory);
                this.router.navigate(['']);
              } else {
                this.toastr.error('Inactive User. Please contact admin');
              }
            } else {
              this.toastr.error('Invalid password');
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
