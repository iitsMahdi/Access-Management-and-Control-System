import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { FormGroup } from '@angular/forms';
import {UserAuthService} from '../Service/user-auth.service'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:8080/users";


  requestHeader =new HttpHeaders(
    { "No-Auth":"True"}
  );
  constructor(private httpClient: HttpClient,private userAuthService : UserAuthService) { }

  getUsersList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  createUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, user);
  }

  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

  updateUser(id: number, user: User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, user);
  }

  deleteUser(id: bigint): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  login(loginForm:FormGroup){
    return this.httpClient.post(this.baseURL+"/authenticate"+loginForm,{headers:this.requestHeader});
  }


  public roleMatch(allowedRoles: any): boolean {
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            return true;
          }
        }
      }
    }

    return false;
  }

}
