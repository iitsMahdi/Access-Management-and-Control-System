import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Porte } from '../model/Porte';
import { Departement } from '../model/Departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private baseURL = "http://localhost:8080/Departement";
  /*private EndPoint="/Departement";
  private Add="/add";*/
  constructor(private httpClient: HttpClient) { }

  getDepList(token: string): Observable<Departement[]>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.get<Departement[]>(`${this.baseURL}`, { headers });
  }

  createDep(token: string, dep: Departement): Observable<Object>{
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.post<Departement>(`${this.baseURL}/add`, { headers });
  }

  getDepById(token: string, id: number): Observable<Departement>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.get<Departement>(`${this.baseURL}/${id}`, { headers });
  }

  updateDep(token: string, id: number, dep: Departement): Observable<Object>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.put(`${this.baseURL}/${id}`, dep, { headers });
  }

  deleteDep(token: string, id: bigint): Observable<Object>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpClient.delete(`${this.baseURL}/${id}`, { headers });
  }
}
