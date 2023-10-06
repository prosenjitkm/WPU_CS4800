// user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:8088/api/auth/';

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  login(credentials: any) {
    return this.http.post(this.baseUrl + 'login', credentials);
  }

  // Any other user-related API calls can be added here.
}
