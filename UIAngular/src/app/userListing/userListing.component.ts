/*userListing.component.ts*/

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { UpdatePopUpComponent } from "../updatePopUp/updatePopUp.component";
import { DeleteUserPopUpComponent } from "../delete-user-pop-up/delete-user-pop-up.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-userListing',
  templateUrl: './userListing.component.html',
  styleUrl: './userListing.component.css'
})
export class UserListingComponent implements AfterViewInit{
  userList: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  constructor(
    private router: Router,
    private service:AuthService,
    private dialog:MatDialog) {
    this.dataSource = new MatTableDataSource<any>();
    this.loadUser();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'userCategory', 'isActive', 'action'];

  loadUser() {
    this.service.getAllUsers().subscribe(response => {
        console.log('Fetched users:', response);
        this.userList = response;
        this.dataSource.data = this.userList;
        this.dataSource.paginator = this.paginator; // Assign paginator
        this.dataSource.sort = this.sort; // Assign sort
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

  onClickProductListOfUser(element: any) {
    this.router.navigate(['/products', element.id]);
  }
}
