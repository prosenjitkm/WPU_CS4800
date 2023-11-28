import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-userListing',
  templateUrl: './userListing.component.html',
  styleUrl: './userListing.component.css'
})
export class UserListingComponent {

  constructor(private service:AuthService) {
  }

  userList: any;
  dataSource: any;
  element: any;

  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'gender', 'email', 'role', 'isActive','action'];


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
