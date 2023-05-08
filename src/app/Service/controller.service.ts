import { Injectable } from '@angular/core';
import { Contoller } from '../model/Controller';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  readonly baseURL = "http://localhost:8080/Controller";


  constructor(private httpClient: HttpClient) { }

  getContList(): Observable<Contoller[]>{

    return this.httpClient.get<Contoller[]>(`${this.baseURL}/all` );
  }

  createCont(cont: Contoller): Observable<Object>{

    return this.httpClient.post<Contoller>(`${this.baseURL}/add`,cont );
  }

  getContById(id: number): Observable<Contoller>{
    return this.httpClient.get<Contoller>(`${this.baseURL}/get/${id}`);
  }

  updateCont(id: number, dep: Contoller): Observable<Object>{

    return this.httpClient.put(`${this.baseURL}/update/${id}`, dep);
  }

  deleteCont(id: bigint,role:any): Observable<Object>{

    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }
}
