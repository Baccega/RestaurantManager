import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: String;
  progressbar: boolean;
  titleSub: Subscription;
  progressSub: Subscription;
  routerSub: Subscription;
  notificationSub: Subscription;
  notLogin: boolean;

  notifications = [];

  constructor(
    private utilsService: UtilsService,
    private location: Location,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(val => {
      const loc = this.location.path();
      this.notLogin = loc == "" || loc == "/login" ? false : true;
    });
    this.titleSub = this.utilsService
      .watchTitle()
      .subscribe(title => (this.title = title));
    this.progressSub = this.utilsService
      .watchProgressbar()
      .subscribe(progressbar => (this.progressbar = progressbar));

    this.notificationSub = this.notificationService
      .watchNotification()
      .subscribe((newNotification: Notification) => {
        this.notifications.push(newNotification);
      });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.titleSub.unsubscribe();
    this.progressSub.unsubscribe();
    this.notificationSub.unsubscribe();
  }

  openSidenav() {
    this.utilsService.setSidebar(true);
  }

  openNotification() {
    const notification = this.notifications.pop();
    this.router.navigate(["waiter", notification.tableNumber]);
  }
}
