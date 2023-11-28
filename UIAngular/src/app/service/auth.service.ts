import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiUrlUsers='http://localhost:3000/users';
  apiUrlUserCategory='http://localhost:3000/user_categories';

  GetAllUsers(){
    return this.http.get(this.apiUrlUsers);
  }

  GetAllUserByCode(code: any){
    return this.http.get(this.apiUrlUsers+'/'+code);
  }

  GetUserByUserName(userName: string) {
    return this.http.get(`${this.apiUrlUsers}?userName=${userName}`);
  }

  proceedRegister(inputData:any){
    return this.http.post(this.apiUrlUsers, inputData);
  }

  updateUser(code: any, inputData:any){
    return this.http.put(this.apiUrlUsers+'/'+code, inputData);
  }

  isLoggedIn(){
    return sessionStorage.getItem('userName')!=null;
  }

  getUserCategory(): number {
    const userCategory = sessionStorage.getItem('userCategory');
    return userCategory !== null ? parseInt(userCategory) : 0;
  }
  GetAllUserCategory() {
    return this.http.get(this.apiUrlUserCategory);
  }
}
