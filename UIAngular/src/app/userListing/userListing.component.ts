import { Component, ViewChild } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import {UpdatePopUpComponent} from "../updatePopUp/updatePopUp.component";

@Component({
  selector: 'app-userListing',
  templateUrl: './userListing.component.html',
  styleUrl: './userListing.component.css'
})
export class UserListingComponent {

  constructor(private service:AuthService, private dialog:MatDialog) {
    this.loadUser();
  }

  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  displayedColumns: string[] = [
      'userId',
    'userName',
    'firstName',
    'lastName',
    'dateOfBirth',
    'gender',
    'email',
    'phone',
    'address',
    'userCategory',
    'isActive',
    'action'];


  loadUser(){
    this.service.GetAllUsers().subscribe(
      response =>{
        this.userList = response;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
    })
  }

  updateUser(element: any) {
  this.dialog.open(UpdatePopUpComponent,{
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'500ms',
    width:'50%',
    data:{
      userElement:element
    }
  });
  }

  deleteUser(element: any) {

  }

  openDialog(){


  }

  getAllProductsForTheUserId(element: any) {

  }
}
