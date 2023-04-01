import { Injectable } from '@angular/core';
import { Profile } from '../model/Profile';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseURL = "http://localhost:8080/profiles";

  constructor(private httpClient: HttpClient) { }

  getProfilesList(): Observable<Profile[]>{
    return this.httpClient.get<Profile[]>(`${this.baseURL}`);
  }

  createProfile(prof: Profile): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, prof);
  }
}
