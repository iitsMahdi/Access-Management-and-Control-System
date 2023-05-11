import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  myVariable: Message[] = [];
  myVariable$ = new Subject<Message[]>(); // create a Subject to emit myVariable updates

  constructor() { }

  setVariable(value: any) {
    this.myVariable.push(value);
    this.myVariable$.next(this.myVariable); // emit the updated myVariable array
  }

  getVariable() {
    return this.myVariable$; // return the Subject instead of the myVariable array
  }
}