import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-updatePopUp',
  templateUrl: './updatePopUp.component.html',
  styleUrl: './updatePopUp.component.css'
})
export class UpdatePopUpComponent implements OnInit{

  userCategoryList: any;

  constructor(
      private builder:FormBuilder,
      private toastr: ToastrService,
      private router: Router,
      private service:AuthService) {
  }

  ngOnInit(): void {
        this.service.GetAllUserCategory().subscribe(response =>{
          this.userCategoryList = response;
        });
    }

  registerForm = this.builder.group({
    userName:this.builder.control(''),
    password:this.builder.control(''),
    firstName:this.builder.control(''),
    lastName:this.builder.control(''),
    dateOfBirth:this.builder.control(''),
    gender:this.builder.control(''),
    email:this.builder.control(''),
    phone:this.builder.control(''),
    houseNumber:this.builder.control(''),
    streetName:this.builder.control(''),
    city:this.builder.control(''),
    state:this.builder.control(''),
    zipCode:this.builder.control(''),
    country:this.builder.control(''),
    userCategory:this.builder.control('', Validators.required),
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
