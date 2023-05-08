import { Injectable } from '@angular/core';
import { Profile } from '../model/Profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseURL = "http://localhost:8080/Profile";

  constructor(private httpClient: HttpClient) { }

  getProfilesList(): Observable<Profile[]>{

    return this.httpClient.get<Profile[]>(`${this.baseURL}/all` );
  }

  createProfile(prof: Profile): Observable<Object>{
    console.log(prof);
    return this.httpClient.post<Profile>(`${this.baseURL}/add`, prof );
  }

  getProfById(id: number): Observable<Profile>{
    return this.httpClient.get<Profile>(`${this.baseURL}/get-one/${id}`);
  }
  deleteProf( id: bigint): Observable<Object>{
    console.log(id)
   return this.httpClient.delete(`${this.baseURL}/delete/`+id);
  }
}
