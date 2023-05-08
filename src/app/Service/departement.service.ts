import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Porte } from '../model/Porte';
import { Departement } from '../model/Departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {



  readonly baseURL = "http://localhost:8080";
  readonly EndPoint="/Departement";
  readonly Add="/add";
  constructor(private httpClient: HttpClient) { }



  getDepList(): Observable<Departement[]>{

    return this.httpClient.get<Departement[]>(`${this.baseURL}`+this.EndPoint+"/all");

  }

  createDep(dep: Departement): Observable<Object>{
    console.log(dep);

    return this.httpClient.post<Departement>(`${this.baseURL}`+this.EndPoint+this.Add,dep );

  }

  getDepById(id: number): Observable<Departement>{

    return this.httpClient.get<Departement>(`${this.baseURL}/Departement/get/${id}`);
  }

  updateDep( id: bigint, dep: Departement): Observable<Object>{

    return this.httpClient.put(`${this.baseURL}/Departement/update/${id}`, dep);
  }

  deleteDep(id: bigint,role:any): Observable<Object|null>{
    if(role==="admin"){
      console.log(id)
      return this.httpClient.delete(`${this.baseURL}`+this.EndPoint+"/delete/"+id);
    }else{
      return of(null)
    }
  }
}
