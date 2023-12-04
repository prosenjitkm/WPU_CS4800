import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { LoginService } from "../../../shared/services/login.service";
import {Router} from "@angular/router";
import { LoginRequestDTO } from '../../../shared/models/login-request.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  LoginRequestDTO: LoginRequestDTO;
  constructor(
    private builder: FormBuilder,
    private toastr:ToastrService,
    private service:LoginService,
    private router:Router) {
    sessionStorage.clear();
    this.LoginRequestDTO = new LoginRequestDTO(this.builder)
  }

ngOnInit() {
}



  proceedLogin() {

    if (this.LoginRequestDTO.loginForm.valid) {
      this.service.login(this.LoginRequestDTO.loginForm.value.username)
        .subscribe(response => {
          const user = Array.isArray(response) && response.length > 0 ? response[0] : null;
            if (user) {
          if (user.password === this.LoginRequestDTO.loginForm.value.password) {
            if (user.isActive == true) {
              sessionStorage.setItem('username', user.username);
              sessionStorage.setItem('userid', user.id);
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
