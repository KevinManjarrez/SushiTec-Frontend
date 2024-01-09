import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {userResponse,user} from "../../modelos/usuario"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="http://localhost:3003/users/"
  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<userResponse<user[]>>{
    return this.http.get<userResponse<user[]>>(`${this.apiUrl}`)
  }

  login(User: user): Observable<userResponse<user[]>>{
    return this.http.post<userResponse<user[]>>(`${this.apiUrl}`,User)
  }

  signup(User: user): Observable<userResponse<user[]>>{
    return this.http.post<userResponse<user[]>>(`${this.apiUrl}`,User)
  }
}
