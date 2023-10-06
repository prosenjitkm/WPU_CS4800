import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LoginRequestDTO } from '../../models/login-request.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginRequest: LoginRequestDTO = new LoginRequestDTO();
  errorMessage: string | null = null;

  constructor(private loginService: LoginService) { }

  login(): void {
    this.loginService.login(this.loginRequest).subscribe(
      data => {
        // Handle successful login. For example, navigate to a dashboard or set user data in a service.
      },
      error => {
        this.errorMessage = error.error.errorMessage || 'An error occurred during login.';
      }
    );
  }
}
