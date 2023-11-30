import { Component, ViewChild } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { UpdatePopUpComponent } from "../updatePopUp/updatePopUp.component";
import {DeleteUserPopUpComponent} from "../delete-user-pop-up/delete-user-pop-up.component";

@Component({
  selector: 'app-userListing',
  templateUrl: './userListing.component.html',
  styleUrl: './userListing.component.css'
})
export class UserListingComponent {

  userList: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  constructor(private service:AuthService, private dialog:MatDialog) {
    this.loadUser();
  }

  displayedColumns: string[] = ['id', 'userName', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'email', 'phone', 'address', 'userCategory', 'isActive', 'action'];

  loadUser(){
    this.service.getAllUsers().subscribe(
      response =>{
        console.log('Fetched users:', response);
        this.userList = response;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;
    },
            error => {
        console.error('Error fetching users:', error);
      });
  }

  updateUser(element: any) {
    this.OpenDialog('1000ms', '600ms', element);
  }

  OpenDialog(enterAnimation: any, exitAnimation: any, element: any) {
    console.log('Opening update dialog for user:', element);
    const popUp = this.dialog.open(UpdatePopUpComponent,{
      enterAnimationDuration:enterAnimation,
      exitAnimationDuration:exitAnimation,
      width:'50%',
      data:{
        id:element.id
      }

  });
    popUp.afterClosed().subscribe(
        response=>{
          this.loadUser();
    })
  }

  deleteUser(element: any) {
    console.log('Attempting to delete user:', element);
    const dialogRef = this.dialog.open(DeleteUserPopUpComponent, {
      width: '250px',
      data: { id: element.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed deletion of user:', element);
        this.service.deleteUser(element.id).subscribe(
          response => {
            console.log('User deleted:', response);
            this.loadUser(); // Refresh the user list
          },
          error => {
            console.error('Error deleting user:', error);
          }
        );
      } else {
        console.log('Deletion cancelled for user:', element);
      }
    });
  }

  getAllProductsForTheUserId(element: any) {

  }
}
