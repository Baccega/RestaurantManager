import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { SidenavService } from "./services/sidenav.service";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "restaurant-app";
  open = false;
  sub: Subscription;

  constructor(private sidenav: SidenavService) {}

  ngOnInit() {
    this.sub = this.sidenav
      .getStatus()
      .subscribe(status => (this.open = status));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClose(): void {
    this.sidenav.setStatus(false);
  }
}
