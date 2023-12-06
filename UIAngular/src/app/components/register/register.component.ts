/*register.component.ts*/

import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthorizationService } from "../../service/auth/authorization.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private builder:FormBuilder,
    private toastr: ToastrService,
    private service:AuthorizationService,
    private router: Router) {
  }
  registrationForm = this.builder.group({
    userName:this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password:this.builder.control('', Validators.compose([Validators.required])),
    firstName:this.builder.control('', Validators.required),
    lastName:this.builder.control('', Validators.required),
    dateOfBirth:this.builder.control('', Validators.required),
    gender:this.builder.control('male'),
    email:this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone:this.builder.control('', Validators.compose([Validators.required])),
    houseNumber:this.builder.control('', Validators.compose([Validators.required])),
    streetName:this.builder.control('', Validators.compose([Validators.required])),
    city:this.builder.control('', Validators.compose([Validators.required])),
    state:this.builder.control('', Validators.compose([Validators.required])),
    zipCode:this.builder.control('', Validators.compose([Validators.required])),
    country:this.builder.control('', Validators.compose([Validators.required])),
    userCategory:this.builder.control(0),
    isActive:this.builder.control(false),
  });

  submitRegistration(){
    console.log('Form data:', this.registrationForm.value);

    if(this.registrationForm.valid)
    {
      this.service.proceedRegister(this.registrationForm.value).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.toastr.success('Please contact admin for enable access', 'Registered Successfully');
          this.router.navigate(['login']);
        },
          error => {
            console.error('Registration failed:', error);
            this.toastr.error('Registration failed. Please try again.');
          }
      );
    } else {
      console.warn('Form is invalid:', this.registrationForm.errors);
      this.toastr.warning('Please send valid data');
    }
  }
}
