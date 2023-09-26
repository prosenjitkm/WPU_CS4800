import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';
  userdata:any;

  constructor(
    private builder: FormBuilder,
    private toastr:ToastrService,
    private service:AuthService,
    private router:Router) {
    sessionStorage.clear();
  }

  loginForm=this.builder.group({
    userName:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required),
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.service.getByCode(this.loginForm.value.userName).subscribe(response => {

        if (Array.isArray(response) && response.length) {
          this.userdata = response[0]; // Get the first user from the array response
        } else {
          this.toastr.error('Invalid username');
          return;
        }

        if(this.userdata.password === this.loginForm.value.password){

          if(this.userdata.active === true){
            sessionStorage.setItem('userName', this.userdata.userName);
            sessionStorage.setItem('role', this.userdata.role); // Fix the key here as mentioned in the previous response
            this.router.navigate(['']);

          } else {
            this.toastr.error('Please contact admin', 'Inactive User');
          }

        } else {
          this.toastr.error('Invalid credentials');
        }
      })
    }
  }
/*
  proceedLogin() {
    if (this.loginForm.valid) {
      this.service.getByCode(this.loginForm.value.userName).subscribe(response => {

        if (Array.isArray(response) && response.length) {
          this.userdata = response[0]; // Get the first user from the array response
        } else {
          this.toastr.error('Invalid username');
          return;
        }

        if(this.userdata.password === this.loginForm.value.password){

          if(this.userdata.isActive === true){
            sessionStorage.setItem('userName', this.userdata.userName);
            sessionStorage.setItem('userName', this.userdata.role);
            this.router.navigate(['']);

          }else{
            this.toastr.error('Please contact admin', 'In Active User')
          }

        }else{
          this.toastr.error('Invalid credentials');
        }
      })
    }
  }*/
}
