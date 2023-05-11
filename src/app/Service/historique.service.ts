import { Injectable } from '@angular/core';
import { Historique } from '../model/Historique';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {
  private baseURL = "http://localhost:8080/Historique";

  constructor(private httpClient: HttpClient) { }

  getHistList(): Observable<Historique[]>{
    return this.httpClient.get<Historique[]>(`${this.baseURL}/counthis` );
  }
}