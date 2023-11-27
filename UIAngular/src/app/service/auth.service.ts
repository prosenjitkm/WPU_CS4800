import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiUrl='http://localhost:3000/user';

  GetAllUsers(){
    return this.http.get(this.apiUrl);
  }

  GetAllUserByCode(code: any){
    return this.http.get(this.apiUrl+'/'+code);
  }

  GetUserByUserName(username: string) {
    return this.http.get(`${this.apiUrl}?username=${username}`);
  }

  proceedRegister(inputData:any){
    return this.http.post(this.apiUrl, inputData);
  }

  updateUser(code: any, inputData:any){
    return this.http.put(this.apiUrl+'/'+code, inputData);
  }
}
