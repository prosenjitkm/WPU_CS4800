import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private builder:FormBuilder,
    private toastr: ToastrService,
    private service:AuthService,
    private router: Router) {
  }
  registerForm = this.builder.group({
    username:this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    firstname:this.builder.control('', Validators.required),
    lastname:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.compose([Validators.required])),
    email:this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender:this.builder.control('male'),
    role:this.builder.control(''),
    isActive:this.builder.control(false),
  });

  proceedRegistration(){
    if(this.registerForm.valid)
    {
      this.service.proceedRegister(this.registerForm.value).subscribe(
        response => {
          this.toastr.success('Please contact admin for enable access', 'Registered Successfully');
          this.router.navigate(['login']);
        });
    }else{
      this.toastr.warning('Please send valid data');
    }
  }
}
