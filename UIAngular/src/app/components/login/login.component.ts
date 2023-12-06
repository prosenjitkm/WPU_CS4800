/*login.component.ts*/
import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { UserService } from "../../service/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private userService: UserService,
              private router: Router) {
    sessionStorage.clear();
  }

  loginForm = this.formBuilder.group({
    userName: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required)
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.userName || '';

      this.userService.getUserByUserName(username).subscribe(
        (response: any) => {
          const user = Array.isArray(response) && response.length > 0 ? response[0] : null;
          if (user && user.password === this.loginForm.value.password) {
            if (user.isActive) {
              sessionStorage.setItem('userName', user.userName);
              sessionStorage.setItem('userCategory', user.userCategory.toString());
              sessionStorage.setItem('userId', user.id.toString());

              // Redirect based on user category
              if (user.userCategory === 1) { // Admin
                this.router.navigate(['/home']).then(() => {
                  this.toastr.success('Logged in as Admin');
                  console.log('Login successful: Logged in as Admin');
                });
              } else if (user.userCategory === 2) { // Buyer
                this.router.navigate(['/shop']).then(() => {
                  this.toastr.success('Logged in as Buyer');
                  console.log('Login successful: Logged in as Buyer');
                });
              } else if (user.userCategory === 3) { // Seller
                this.router.navigate(['/home']).then(() => {
                  this.toastr.success('Logged in as Seller');
                  console.log('Login successful: Logged in as Seller');
                });
              } else {
                this.toastr.error('User Role unassigned. Please contact IT');
                console.log('Login error: User Role unassigned');
              }
            } else {
              this.toastr.error('Inactive User. Please contact admin');
              console.log('Login error: Inactive User');
            }
          } else {
            this.toastr.error(user ? 'Invalid password' : 'User not found');
            console.log('Login error: ' + (user ? 'Invalid password' : 'User not found'));
          }
        },
        error => {
          this.toastr.error('Error occurred during login');
          console.error('Login error:', error);
        }
      );
    } else {
      this.toastr.error('Form is not valid');
      console.log('Login error: Form is not valid');
    }
  }
}
