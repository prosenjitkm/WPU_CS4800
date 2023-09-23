import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/user';

  getAll() {
    return this.http.get(this.apiUrl);
  }

  getByCode(code: any) {
    //return this.http.get(this.apiUrl+'/'+code);
    return this.http.get(`${this.apiUrl}?userName=${code}`);
  }

  proceedRegister(inputdata: any) {
    return this.http.post(this.apiUrl, inputdata);
  }

  updateUser(code: any, inputdata: any) {
    return this.http.put(this.apiUrl+'/'+code, inputdata);
  }

  isLoggedIn(){
    return sessionStorage.getItem('userName')!=null;
  }

  getUserRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
}
