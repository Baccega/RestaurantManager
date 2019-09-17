import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { SocketService } from "./socket.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  waiterId = "";
  notifications: Subject<Notification> = new Subject();

  constructor(
    private socketService: SocketService,
    private authService: AuthService
  ) {
    this.authService.watchUser().subscribe(newUser => {
      if (newUser.role == "waiter") {
        this.waiterId = newUser.userId;
        this.socketService.initSocket();
        this.socketService
          .listen<any>("notify-waiter")
          .subscribe(newNotification => {
            if (newNotification.waiterId == this.waiterId) {
              this.notifications.next(newNotification);
            }
          });
      } else {
        this.waiterId = "";
      }
    });
  }

  watchNotification(): Observable<Notification> {
    return this.notifications;
  }
}
