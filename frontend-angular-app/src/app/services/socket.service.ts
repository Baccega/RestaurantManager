import { Injectable } from "@angular/core";
import * as socketIo from "socket.io-client";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  socket;

  constructor() {}

  initSocket(): void {
    this.socket = socketIo(environment.serverUrl);
  }

  listen<T>(eventName): Observable<T> {
    return new Observable<T>(observer => {
      this.socket.on(eventName, (data: any) => observer.next(data));
    });
  }
}
