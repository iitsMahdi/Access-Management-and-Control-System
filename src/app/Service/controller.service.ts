import { Injectable } from '@angular/core';
import { Contoller } from '../model/Conroller';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  private baseURL = "http://localhost:8080/departement";


  requestHeader =new HttpHeaders(
    { "No-Auth":"True"}
  );
  constructor(private httpClient: HttpClient) { }

  getContList(): Observable<Contoller[]>{
    return this.httpClient.get<Contoller[]>(`${this.baseURL}`);
  }

  createCont(cont: Contoller): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, cont);
  }

  getContById(id: number): Observable<Contoller>{
    return this.httpClient.get<Contoller>(`${this.baseURL}/${id}`);
  }

  updateCont(id: number, dep: Contoller): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, dep);
  }

  deleteCont(id: bigint): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
