import {Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../service/auth.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-updatePopUp',
  templateUrl: './updatePopUp.component.html',
  styleUrl: './updatePopUp.component.css'
})
export class UpdatePopUpComponent implements OnInit{

  UserCategoryList: any;
  editData: any;

  constructor(
      private builder:FormBuilder,
      private toastr: ToastrService,
      private service: AuthService,
      @Inject(MAT_DIALOG_DATA) public data:any,
      public dialogRef: MatDialogRef<UpdatePopUpComponent>) {

    this.service.getAllUserCategory().subscribe(
        response =>{this.UserCategoryList = response;
        });
  }

  ngOnInit(): void {
    console.log('Received userId for update:', this.data);
    if(this.data.userId != null && this.data.userId != ''){
        this.loadUserData(this.data.userId);
        console.log(this.data.userId);
      }else {
      console.error('No userId provided to UpdatePopUpComponent');
    }
  }

  updateForm = this.builder.group({
    userId:this.builder.control(''),
    userName:this.builder.control(''),
    password:this.builder.control(''),
    firstName:this.builder.control(''),
    lastName:this.builder.control(''),
    dateOfBirth:this.builder.control(''),
    gender:this.builder.control('Male'),
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

  loadUserData(userId: number){
    this.service.getUserByUserId(this.data.userId).subscribe(response=>{
      console.log('Loaded user data for update:', response);
      this.editData = response;
      this.updateForm.setValue({
        userId: this.editData.userId,
        userName: this.editData.userName,
        password: null,
        firstName: this.editData.firstName,
        lastName: this.editData.lastName,
        dateOfBirth: this.editData.dateOfBirth,
        gender: this.editData.gender,
        email: this.editData.email,
        phone: this.editData.phone,
        houseNumber: this.editData.houseNumber,
        streetName: this.editData.streetName,
        city: this.editData.city,
        state: this.editData.state,
        zipCode: this.editData.zipCode,
        country: this.editData.country,
        userCategory: this.editData.userCategory,
        isActive: this.editData.isActive
      });
    },
            error => {
      console.error('Error loading user data:', error);
    });
  }

  updateUser(){
    if(this.updateForm.valid) {
      console.log('Updating user with data:', this.updateForm.value);
      this.service.updateUser(this.updateForm.value.userId, this.updateForm.value).subscribe(
          response=>{
            this.toastr.success('Update Successfully completed.');
            this.dialogRef.close();
          });
    }else{
      console.warn('Update form is invalid');
      this.toastr.warning('Please enter valid data');
    }
  }
}
