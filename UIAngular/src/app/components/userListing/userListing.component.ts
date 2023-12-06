/*userListing.component.ts*/

import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { DeleteUserPopUpComponent } from "../delete-user-pop-up/delete-user-pop-up.component";
import { Router } from "@angular/router";
import { UserService } from "../../service/user/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-userListing',
  templateUrl: './userListing.component.html',
  styleUrl: './userListing.component.css'
})
export class UserListingComponent implements OnInit, AfterViewInit{
  userList: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;
  userCategoriesMap: Map<number, string> = new Map();

  constructor(private router: Router,
              private userService:UserService,
              private dialog:MatDialog,
              private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<any>();
  }
  ngOnInit() {
    this.loadUser();
    this.loadUserCategories();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'phone', 'userCategory', 'isActive', 'action'];

  loadUser() {
    this.userService.getAllUsers().subscribe(response => {
          console.log('Fetched users:', response);
          this.toastr.success('Users successfully loaded');
          this.userList = response;
          this.dataSource.data = this.userList;
          this.dataSource.paginator = this.paginator; // Assign paginator
          this.dataSource.sort = this.sort; // Assign sort
        },
        error => {
          console.error('Error fetching users:', error);
          this.toastr.error('Failed to load users');
        });
  }

  loadUserCategories() {
    this.userService.getAllUserCategories().subscribe(categories => {
      categories.forEach(category => {
        this.userCategoriesMap.set(category.id, category.userCategoryName);
      });
    });
  }

  getCategoryName(categoryId: number): string {
    return this.userCategoriesMap.get(categoryId) || 'Unknown';
  }

  updateUser(userId: number): void {
    this.router.navigate(['/update-user', userId]);
  }


  deleteUser(user: any) {
    console.log('Attempting to delete user:', user);
    const dialogRef = this.dialog.open(DeleteUserPopUpComponent, {
      width: '250px',
      data: { id: user.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Confirmed deletion of user:', user);
        this.userService.deleteUser(user.id).subscribe(
          response => {
            console.log('User deleted:', response);
            this.toastr.success('User successfully deleted');
            this.loadUser(); // Refresh the user list
          },
          error => {
            console.error('Error deleting user:', error);
            this.toastr.error('Failed to delete user');
          }
        );
      } else {
        console.log('Deletion cancelled for user:', user);
        this.toastr.info('User deletion cancelled');
      }
    });
  }

  onClickProductListOfUser(element: any) {
    this.router.navigate(['/products', element.id]);
  }
}
