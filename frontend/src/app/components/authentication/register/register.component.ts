import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { RegisterService } from "../../../shared/services/register.service";
import {Router} from "@angular/router";
import { UserRequestDTO } from "../../../shared/models/user-request.dto";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{

  UserRequestDTO: UserRequestDTO;
  constructor(
    private builder: FormBuilder,
    private toastr:ToastrService,
    private service:RegisterService,
    private router:Router) {
    sessionStorage.clear();
    this.UserRequestDTO = new UserRequestDTO(this.builder)
  }

  ngOnInit() {
  }


    submitRegistration(){
      console.log('Form data:', this.UserRequestDTO.registrationForm.value);

      if(this.UserRequestDTO.registrationForm.valid)
      {
        this.service.register(this.UserRequestDTO.registrationForm.value).subscribe(
          response => {
            console.log('Registration successful:', response);
            this.toastr.success('Please contact admin to enable access', 'Registered Successfully');
            this.router.navigate(['login']);
          },
          error => {
            console.error('Registration failed:', error);
            this.toastr.error('Registration failed. Please try again.');
          }
        );
      } else {
        console.warn('Form is invalid:', this.UserRequestDTO.registrationForm.errors);
        this.toastr.warning('Please send valid data');
      }
    }

}
