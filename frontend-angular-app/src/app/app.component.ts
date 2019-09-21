import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { UtilsService } from "./services/utils.service";

declare var device;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "restaurant-app";
  open = false;
  sub: Subscription;

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.sub = this.utilsService
      .watchSidebar()
      .subscribe(status => (this.open = status));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClose(): void {
    this.utilsService.setSidebar(false);
  }
}
