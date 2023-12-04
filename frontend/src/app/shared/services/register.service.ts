import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, forkJoin, switchMap, tap, throwError} from "rxjs";

import {UserRequestDTO} from "../models/user-request.dto";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:3306/api/auth';

  constructor(private http: HttpClient) { }

  register(userRequestDTO: UserRequestDTO): Observable<UserRequestDTO> {
    console.log('Sending registration data:', UserRequestDTO);
    return this.http.post<UserRequestDTO>(this.apiUrl, userRequestDTO)
        .pipe(
            tap( response=> console.log('Received response: ', response)),
              catchError(error => {
                console.error('Error Occurred: ', error);
                return throwError(error);
              })
    );
  }
}
