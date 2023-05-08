import { Injectable } from '@angular/core';
import {Observable, Subject, catchError, map, throwError} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;

  private messagesSubject = new Subject<Message>();
  public messages$ = this.messagesSubject.asObservable();

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(): Observable<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.socket$.pipe(
        map(msg => {
          console.log('Received message of type: ' + typeof msg);
          return msg;
        }),
        catchError(error => {
          console.error('WebSocket error:', error);
          return throwError(error);
        })
      ).subscribe(this.messagesSubject);
    }
    return this.messages$;
  }

  sendMessage(msg: Message): void {
    this.socket$.next(msg);
  }


  /**
   * Return a custom WebSocket subject which reconnects after failure
   */
  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: "ws://localhost:8080/websocket",
      binaryType: 'arraybuffer',
      deserializer: ({ data }) => {
        let buffer = data;
        if (typeof data !== 'object' || !('byteLength' in data)) {
          // If data is not an ArrayBuffer or ArrayBufferView, try to create an ArrayBuffer from it
          try {
            buffer = new TextEncoder().encode(data).buffer;
          } catch (e) {
            console.error('Failed to create ArrayBuffer from data:', data);
            return {};
          }
        }

        const UTF8 = new TextDecoder('utf-8');
        const msg = JSON.parse(UTF8.decode(buffer));
        return msg;
      },
      openObserver: {
        next: () => {
          console.log('[WebSocketService]: connection ok');
        }
      },
      closeObserver: {
        next: () => {
          console.log(`[WebSocketService]: connection closed`);
          this.socket$ = undefined! ;
          this.connect();
        }
      }
    });
  }
}

