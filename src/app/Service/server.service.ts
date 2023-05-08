import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
  export class ServerService {
    private stompClient!: Client;
    private messageSubject = new BehaviorSubject<string>('');

    constructor() { }

    public connect(): void {
      const socket = new WebSocket('ws://' +"localhost:4200/attendance" );
      this.stompClient = new Client({
        webSocketFactory: () => socket
      });

      this.stompClient.onConnect = (frame) => {
        console.log('Connected to websocket server');
        this.stompClient.subscribe('/topic/attendance', (message: Message) => {
          console.log("Received data from websocket server:");
          console.log(message.body);
          this.messageSubject.next(message.body);
        });
      };

      this.stompClient.activate();
    }

    public sendMessage(message: string): void {
      const msg: Message = {
        body: message,
        headers: {},
        ack: () => {},
        nack: () => {},
        command: '',
        isBinaryBody: false,
        binaryBody: new Uint8Array()
      };
      this.stompClient.publish({ destination: '/app/attendance', body: JSON.stringify(msg) });
    }

    public onMessage() {
      return this.messageSubject.asObservable();
    }
  }
