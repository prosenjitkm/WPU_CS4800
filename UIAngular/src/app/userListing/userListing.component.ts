import { Component } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-userListing',
  templateUrl: './userListing.component.html',
  styleUrl: './userListing.component.css'
})
export class UserListingComponent {

  constructor(private service:AuthService) {
    this.loadUser();
  }

  userList: any;
  dataSource: any;
  element: any;

  displayedColumns: string[] = ['userId', 'userName', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'email', 'phone', 'address', 'userCategory', 'isActive','action'];


  loadUser(){
    this.service.GetAllUsers().subscribe(
      response =>{
        this.userList = response;
        this.dataSource = new MatTableDataSource(this.userList);
    })
  }

  updateUser(element: any) {

  }

  deleteUser(element: any) {

  }
}
