import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestDTO } from '../models/login-request.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3306/api/auth';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequestDTO): Observable<LoginRequestDTO> {
    return this.http.get<LoginRequestDTO>(`${this.apiUrl}?userName=${loginRequest.loginForm.value.username}`);
  }
  getUsersId(): number{
    const userid = sessionStorage.getItem('userid');
    if(userid)
    {
      return parseInt(userid);
    }
    else
    {
      return 0;
    }
}
  isLoggedIn(){
    return sessionStorage.getItem('username') != null;
  }
}
