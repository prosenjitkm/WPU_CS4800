import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequestDTO } from '../models/login-request.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8088/api/auth';

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequestDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginRequest);
  }
}
