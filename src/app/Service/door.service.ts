import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Porte } from '../model/Porte';

@Injectable({
  providedIn: 'root'
})
export class DoorService {
  private baseURL = "http://localhost:8080/Porte";
  private SecURL = "http://localhost:8080/Departement";


  constructor(private httpClient: HttpClient) { }

  getDoorsList(): Observable<Porte[]>{
    return this.httpClient.get<Porte[]>(`${this.baseURL}/get-all`);
  }
  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseURL}/countall`);
  }

  createDoor(porte: Porte): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add`, porte);
  }

  getDoorById(id: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/get-one/${id}`);
  }

  getDoorByDep(dep: any): Observable<Porte>{
    return this.httpClient.get<Porte>(`${this.SecURL}/getByDep/${dep}`);
  }

  updateDoor(id: number, door: Porte): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/update/${id}`, door);
  }

  deleteDoor(id: bigint,role:any): Observable<Object|null>{
    if(role==="admin"){
      console.log(id)
      return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
    }else{
      return of(null)
    }
  }
  getDoorCnt(id: number): Observable<any>{
    return this.httpClient.get<any>(`${this.baseURL}/getDoorsCnt/${id}`);
  }
}
