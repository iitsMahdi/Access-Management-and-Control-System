import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historique } from '../model/Historique';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private baseURL = "http://localhost:8080/Historique";

  constructor(private httpClient: HttpClient) { }

  getHistList(): Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.baseURL}/countdev` );
  }
}
