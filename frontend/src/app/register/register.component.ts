import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr:ToastrService,
    private service:AuthService,
    private router:Router) {
  }

  registrationForm = this.builder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    gender: ['male', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    houseNumber: ['', Validators.required],
    streetName: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
    country: ['', Validators.required],
    role:[''],
    isActive: [false],
  });


  proceedRegister() {
    if (this.registrationForm.valid) {
      this.service.proceedRegister(this.registrationForm.value).subscribe(response => {
        this.toastr.success('Registration Successful');
        this.router.navigate(['/login']);
      });
    }
    else{
      this.toastr.error('Registration Failed');
    }
  }
}
