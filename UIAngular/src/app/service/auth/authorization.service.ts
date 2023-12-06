/*authorization.service.ts*/

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) {}

  apiUrlUsers = 'http://localhost:3000/users';
  apiUrlUserCategories = 'http://localhost:3000/user_categories';

  getCurrentUserId(): number | null {
    const userId = sessionStorage.getItem('userId');
    console.log(userId);
    return userId ? parseInt(userId) : null;
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
}
