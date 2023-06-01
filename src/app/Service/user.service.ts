import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { User } from '../model/User';
import { FormGroup } from '@angular/forms';
import {UserAuthService} from '../Service/user-auth.service'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = "http://localhost:8080";
  private AuthURL = "http://localhost:8080/api/v1/auth/authenticate"
  private RefTokenURL = "http://localhost:8080/api/v1/auth/"
  private EndPoint ="/User"

  constructor(private router: Router,private httpClient: HttpClient,private userAuthService : UserAuthService) { }

  getUsersList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`+this.EndPoint+"/alluser" );
  }
  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseURL}`+this.EndPoint+"/countall" );
  }
  getVisList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`+this.EndPoint+"/allvisit" );
  }
  createUser(user: User,arr:any): Observable<Object>{
    console.log(user);
    return this.httpClient.post<User>(`${this.baseURL}`+this.AuthURL+"/register/"+arr,user);
  }

  getUserById( id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}`+this.EndPoint+"/get-one/"+id);
  }

  getUserByEmail( email: String): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}`+this.EndPoint+"/findbyem/"+email);
  }

  updateUser(id: number, user: User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}`+this.EndPoint+"/update/"+id, user);
  }

  updatePassword(id: number, ps: any): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}`+this.EndPoint+"/updateps/"+id,ps);
  }
  deleteUser(id: bigint,role:any): Observable<Object|null>{
    if(role==="admin"){
      console.log(id)
      return this.httpClient.delete(`${this.baseURL}`+this.EndPoint+"/delete/"+id);
    }else{
      return of(null)
    }
  }
  login(loginForm:FormGroup){
    console.log(loginForm.value)
    return this.httpClient.post<any>(`${this.AuthURL}`,loginForm.value);
  }

  refreshToken(): Observable<any> {
    return this.httpClient.get<any>(`${this.RefTokenURL}refresh-token`);
  }

  getRefreshToken(email: string): Observable<string> {
    return this.httpClient.get(`${this.baseURL}${this.EndPoint}/getref/${email}`, { responseType: 'text' });
  }

  logoutUser(){
    this.userAuthService.logOut();
    this.userAuthService.clear();
    this.router.navigate([''])
  }

  register(role:String,user:any){
    const userRequest = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role // assign the role parameter value to the role field
    };
    if (role=="ADMIN"){
      return this.httpClient.post<User>(`${this.baseURL}/api/v1/auth`+"/registerAdmin",userRequest );
    }else{
      return this.httpClient.post<User>(`${this.baseURL}/api/v1/auth`+"/register",userRequest );
    }
  }

  assignPortes(i:any,u:any):Observable<Object>{
    return this.httpClient.get<User>(`${this.baseURL}`+this.EndPoint+"/addd/"+i+"/"+u);
  }

  MailingUserAccountCreated(email: any,psw:any): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}`+this.EndPoint+"/send-emaill/"+email+"/"+psw);
  }

  MailingUserPwdChanged(email: any,psw:any): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}`+this.EndPoint+"/send-email/"+email+"/"+psw);
  }

  MailingAdminForgetPwd(email: any): Observable<string> {
    return this.httpClient.get(`${this.baseURL}${this.EndPoint}/send-email-ps/${email}`, { responseType: 'text' });
  }
}
