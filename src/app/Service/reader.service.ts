import { Injectable } from '@angular/core';
import { Reader } from '../model/Reader';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  readonly baseURL = "http://localhost:8080/Lecteur";
  readonly doorURL = "http://localhost:8080/Porte";


  constructor(private httpClient: HttpClient) { }

  getReaderList(): Observable<Reader[]>{

    return this.httpClient.get<Reader[]>(`${this.baseURL}/all` );
  }

  createReader(cont: Reader): Observable<Object>{

    return this.httpClient.post<Reader>(`${this.baseURL}/add`,cont );
  }

  getReaderById(id: number): Observable<any>{

    return this.httpClient.get<any>(`${this.baseURL}/get-one/${id}`);
  }

  updateReader(id: number, dep: Reader): Observable<Object>{

    return this.httpClient.put(`${this.baseURL}/update/${id}`, dep);
  }

  deleteReader(id: bigint,role:any): Observable<Object|null>{
    if(role==="admin"){
      console.log(id)
      return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
    }else{
      return of(null)
    }
  }


  getReDoor(id: number): Observable<any>{
    return this.httpClient.get<any>(`${this.doorURL}/getLecsCnt/${id}`);
  }
}
