import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Porte } from '../model/Porte';

@Injectable({
  providedIn: 'root'
})
export class DoorService {
  private baseURL = "http://localhost:8080/porte";


  requestHeader =new HttpHeaders(
    { "No-Auth":"True"}
  );
  constructor(private httpClient: HttpClient) { }

  getUsersList(): Observable<Porte[]>{
    return this.httpClient.get<Porte[]>(`${this.baseURL}`);
  }

  createDoor(porte: Porte): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, porte);
  }

  getDoorById(id: number): Observable<Porte>{
    return this.httpClient.get<Porte>(`${this.baseURL}/${id}`);
  }

  updateDoor(id: number, door: Porte): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, door);
  }

  deleteDoor(id: bigint): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
