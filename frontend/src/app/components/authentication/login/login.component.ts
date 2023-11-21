import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { LoginService } from "../../../shared/services/login.service";
import {Router} from "@angular/router";
import { LoginRequestDTO } from '../../../shared/models/login-request.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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

  userdata:any;

  proceedLogin() : boolean {
    let LoggedIn: boolean = false;
    if (this.LoginRequestDTO.loginForm.valid) {
      this.service.login(this.LoginRequestDTO.loginForm.value.username).subscribe(async response => {

        if (Array.isArray(response) && response.length) {
          this.userdata = response[0]; // Get the first user from the array response
        } else {
          this.toastr.error('Invalid username');
          return;
        }

        if (this.userdata.password === this.LoginRequestDTO.loginForm.value.password) {

          if (this.userdata.isActive === true) {
            sessionStorage.setItem('userName', this.userdata.userName);
            sessionStorage.setItem('role', this.userdata.role);
            LoggedIn = await this.router.navigate(['']);

          } else {
            this.toastr.error('Please contact admin', 'InActive User')
          }

        } else {
          this.toastr.error('Invalid credentials');
        }
      })

    }
    return(LoggedIn);
  }
}
