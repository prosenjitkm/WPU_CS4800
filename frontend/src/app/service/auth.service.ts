import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  API_URL = 'http://localhost:8088/api/users';

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, { username, password })
      .pipe(
        catchError(this.handleError)
      );
  }
  private handleError(error: any) {
    return throwError(error.error.message || 'Server error');
  }

  getAll() {
    return this.http.get(this.API_URL);
  }

  getByCode(code: any) {
    return this.http.get(`${this.API_URL}?userName=${code}`);
  }

  proceedRegister(inputdata: any) {
    console.log(inputdata);
    console.log(this.API_URL);
    return this.http.post(this.API_URL, inputdata);
  }

  updateUser(code: any, inputdata: any) {
    return this.http.put(this.API_URL+'/'+code, inputdata);
  }

  isLoggedIn(){
    return sessionStorage.getItem('userName')!=null;
  }

  getUserRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }

  getAllRole(){
    return this.http.get('http://localhost:3000/role');
  }
}
