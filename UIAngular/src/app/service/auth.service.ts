import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiUrlUsers='http://localhost:3000/users';
  apiUrlUserCategory='http://localhost:3000/user_categories';

  getAllUsers(){
    return this.http.get(this.apiUrlUsers);
  }
  getUserByUserId(userId: any){
    return this.http.get(`${this.apiUrlUsers}?userId=${userId}`);
  }
  getUserByUserName(userName: string) {
    return this.http.get(`${this.apiUrlUsers}?userName=${userName}`);
  }
  proceedRegister(inputData:any){
    return this.http.post(this.apiUrlUsers, inputData);
  }
  isLoggedIn(){
    return sessionStorage.getItem('userName')!=null;
  }
  getUsersUserCategory(): number {
    const userCategory = sessionStorage.getItem('userCategory');
    return userCategory !== null ? parseInt(userCategory) : 0;
  }
  getAllUserCategory() {
    return this.http.get(this.apiUrlUserCategory);
  }

  updateUser(userId:any,inputdata:any){
    return this.http.put(this.apiUrlUsers+'/'+userId,inputdata);
  }
}
