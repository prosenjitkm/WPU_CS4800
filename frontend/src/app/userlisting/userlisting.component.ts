import { Component, ViewChild } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {UpdatepopupComponent} from "../updatepopup/updatepopup.component";


@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {
  displayedColumns: string[] = [
    'id',
    'userName',
    'firstName',
    'lastName',
    'role',
    'isActive',
    'action'];

  constructor(private service:AuthService, private dialog:MatDialog){
    this.loadUser();

  }

  userlist:any;
  dataSource:any;
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  @ViewChild(MatSort) sort !:MatSort;

  loadUser(){
    this.service.getAll().subscribe(response =>{
      this.userlist=response;
      this.dataSource=new MatTableDataSource(this.userlist);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    });
  }

  updateUser(code:any){
    this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode:code
      }
    });
  }

  deleteUser(code:any){

  }

  openDialog(){

  }
}
