import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms";
import { AuthService} from "../service/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit{
  constructor(
    private builder: FormBuilder,
    private toastr:ToastrService,
    private service:AuthService,
    private router:Router) {
  }

  ngOnInit(): void {
    this.service.getAllRole().subscribe(response=>{
      this.rolelist=response;
    });
  }

  rolelist:any;

  updateForm = this.builder.group({
    userName: [''],
    password: [''],
    firstName: [''],
    lastName: [''],
    role:['', Validators.required],
    isActive: [false],
  });


  updateUser() {
    if (this.updateForm.valid) {
      this.service.proceedRegister(this.updateForm.value).subscribe(response => {
        this.router.navigate(['/login']);
      });
    }
    else{
      this.toastr.error('Registration Failed');
    }
  }

}
