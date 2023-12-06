/*user.service.ts*/
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {UserCategory} from "../../models/userCategoryModel";
import {User} from "../../models/userModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  apiUrlUsers = 'http://localhost:3000/users';
  apiUrlUserCategories = 'http://localhost:3000/user_categories';

  getAllUsers() {
    return this.http.get(this.apiUrlUsers);
  }

  getUserByUserName(userName: string) {
    return this.http.get(`${this.apiUrlUsers}?userName=${userName}`);
  }

  getUserByUserId(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrlUsers}/${userId}`);
  }

  updateUser(id: any, inputdata: any) {
    return this.http.put(this.apiUrlUsers + '/' + id, inputdata);
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

  getAllUserCategories() {
    return this.http.get<UserCategory[]>(this.apiUrlUserCategories);
  }

    getUsersUserCategory() {
      const userCategory = sessionStorage.getItem('userCategory');
      return userCategory ? parseInt(userCategory, 10) : 0;
    }
}
