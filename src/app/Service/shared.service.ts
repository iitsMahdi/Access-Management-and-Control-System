import { Injectable } from '@angular/core';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  myVariable : Message[]=[]


  constructor() { }


  setVariable(value: any) {
    this.myVariable.push(value)
  }

  getVariable() {
    return this.myVariable;
  }
}
