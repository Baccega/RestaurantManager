import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { SocketService } from "./socket.service";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  waiterId;
  notifications: Subject<Notification> = new Subject();

  constructor(private socketService: SocketService) {}

  watchNotification(): Observable<Notification> {
    return this.notifications;
  }

  setWaiterId(newId) {
    this.waiterId = newId;
    console.log("New Id: " + newId);
    this.socketService.initSocket();
    this.socketService
      .listen<any>("notify-waiter")
      .subscribe(newNotification => {
        console.log(newNotification);
        if (newNotification.waiterId == this.waiterId) {
          console.log("My notification");
          this.notifications.next(newNotification);
        }
      });
  }
}
