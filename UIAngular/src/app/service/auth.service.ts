import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  apiUrlUsers = 'http://localhost:3000/users';
  apiUrlUserCategory = 'http://localhost:3000/user_categories';

  getAllUsers() {
    return this.http.get(this.apiUrlUsers);
  }

  getUserByUserId(id: any) {
    return this.http.get(`${this.apiUrlUsers}?id=${id}`);
  }

  getUserByUserName(userName: string) {
    return this.http.get(`${this.apiUrlUsers}?userName=${userName}`);
  }

  proceedRegister(inputData: any) {
    console.log('Sending registration data:', inputData);
    return this.http.post(this.apiUrlUsers, inputData)
      .pipe(
        tap(response => console.log('Received response:', response)),
        catchError(error => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }

  isLoggedIn() {
    return sessionStorage.getItem('userName') != null;
  }

  getUsersUserCategory(): number {
    const userCategory = sessionStorage.getItem('userCategory');
    return userCategory !== null ? parseInt(userCategory) : 0;
  }

  getAllUserCategory() {
    return this.http.get(this.apiUrlUserCategory);
  }

  updateUser(id: any, inputdata: any) {
    return this.http.put(this.apiUrlUsers + '/' + id, inputdata);
  }

  GetUserbyCode(id: any) {
    return this.http.get(this.apiUrlUsers + '/' + id);

  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrlUsers}/${id}`)
      .pipe(
        tap(response => console.log('User deleted:', response)),
        catchError(error => {
          console.error('Error deleting user:', error);
          return throwError(error);
        })
      );
  }
}
