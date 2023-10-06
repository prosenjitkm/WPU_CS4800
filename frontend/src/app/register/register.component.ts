// register.component.ts

import { Component } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  user = {
    username: '',
    password: '' // Add any other fields you need
  };

  constructor(private userService: UserService) { }

  register() {
    this.userService.register(this.user).subscribe(
      data => {
        console.log('Registration successful');
        // Navigate to login or dashboard page after successful registration
      },
      error => {
        console.log('Registration error', error);
      }
    );
  }
}
