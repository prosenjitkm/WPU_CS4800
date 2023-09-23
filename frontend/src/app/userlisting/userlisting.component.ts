import { Component } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { MatTableDataSource } from "@angular/material/table";

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

  constructor(private service:AuthService){
    this.loadUser();

  }

  userlist:any;
  dataSource:any;

  loadUser(){
    this.service.getAll().subscribe(response =>{
      this.userlist=response;
      this.dataSource=new MatTableDataSource(this.userlist);
    });
  }

  updateUser(code:any){

  }

  deleteUser(code:any){

  }
}
