// login.component.ts

import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service"; // Adjust the path accordingly

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = {
    username: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

    login() {
        this.userService.login(this.credentials).subscribe(
            (data: any) => {
                console.log('Login successful');
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.router.navigate(['/dashboard']);
            },
            error => {
                console.log('Login error', error);
            }
        );
  }
}
