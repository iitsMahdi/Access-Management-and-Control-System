import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterEV } from '../model/FilterEv';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseURL = "http://localhost:8080/Event";

  constructor(private httpClient: HttpClient) { }

  getDoorsList(): Observable<Event[]>{
    return this.httpClient.get<Event[]>(`${this.baseURL}/all`);
  }

  async count(nameE: any): Promise<number> {
    try {
      const response = await this.httpClient.get<number>(`${this.baseURL}/count/${nameE}`).toPromise();
      if (response !== undefined) {
        return response;
      } else {
        return 0; // or any other default value you want to use when the response is undefined
      }
    } catch (error) {
      console.error(error);
      return 0; // or any other default value you want to use when an error occurs
    }
  }

  getFilterEV(fEV: FilterEV): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/filterEV`, fEV);
  }

  getAttEventToday(): Observable<Event[]>{
    return this.httpClient.get<Event[]>(`${this.baseURL}/alarmEV`);
  }
  getACCEventToday(): Observable<Event[]>{
    return this.httpClient.get<Event[]>(`${this.baseURL}/monitEV`);
  }
}
