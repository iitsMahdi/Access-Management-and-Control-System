import { Injectable } from '@angular/core';
import { Waveshare } from '../model/Waveshare';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaveshareService {

  readonly baseURL = "http://localhost:8080/Wave";


  constructor(private httpClient: HttpClient) { }

  getWaveList(): Observable<Waveshare[]>{
    return this.httpClient.get<Waveshare[]>(`${this.baseURL}/all`);
  }

  createWave(w: Waveshare): Observable<Object>{
    return this.httpClient.post<Waveshare>(`${this.baseURL}/add`,w );
  }

  getWaveById(id: number): Observable<Waveshare>{
    return this.httpClient.get<Waveshare>(`${this.baseURL}/get/${id}`);
  }

  updateWave(id: number, w: Waveshare): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/update/${id}`, w);
  }

  deleteWave(id: bigint,role:any):  Observable<Object|null>{
    if(role==="admin"){
      console.log(id)
      return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
    }else{
      return of(null)
    }
  }
}
