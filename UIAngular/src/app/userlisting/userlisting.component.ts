import { Component } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrl: './userlisting.component.css'
})
export class UserlistingComponent {

  constructor(private service:AuthService) {
  }

  private userList: any;

  displayedColumns: string[] = ['id', 'username', 'firstname', 'lastname', 'gender', 'email'];

  loadUser(){
    this.service.GetAllUsers().subscribe(
      response =>{
        this.userList = response;
    })
  }
}
