import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { ActivatedRoute, UrlSegment } from "@angular/router";

@Component({
  selector: "app-cashier-dashboard",
  templateUrl: "./cashier-dashboard.component.html",
  styleUrls: ["./cashier-dashboard.component.scss"]
})
export class CashierDashboardComponent implements OnInit {
  free: boolean = false;

  constructor(
    private utilsService: UtilsService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("Dashboard");
    this.activeRoute.url.subscribe((route: UrlSegment[]) => {
      console.log(route);
      this.free = route.includes(new UrlSegment("free", {})) ? true : false;
    });
  }
}
