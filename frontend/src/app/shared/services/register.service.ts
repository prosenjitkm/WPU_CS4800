import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {UserRequestDTO} from "../models/user-request.dto";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:3306/api/auth';

  constructor(private http: HttpClient) { }

  register(userRequestDTO: UserRequestDTO): Observable<UserRequestDTO> {
    return this.http.post<UserRequestDTO>(`${this.apiUrl}/register`, userRequestDTO);
  }

}
