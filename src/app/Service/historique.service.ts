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

  getByDepMonth(dep:any,month:any): Observable<Historique[]>{
    return this.httpClient.get<Historique[]>(`${this.baseURL}/counthis/${dep}/${month}`);
  }


  getHistToday(): Observable<Historique[]>{
    return this.httpClient.get<Historique[]>(`${this.baseURL}/counthiss` );
  }
  getFilterHist(fEV:any): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/filterEV1`, fEV);
  }

  getDenByDep(dep:any){
    return this.httpClient.get(`${this.baseURL}/counthist/`+dep );
  }

}
