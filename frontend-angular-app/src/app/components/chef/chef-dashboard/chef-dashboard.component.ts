import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/models/Order";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-chef-dashboard",
  templateUrl: "./chef-dashboard.component.html",
  styleUrls: ["./chef-dashboard.component.scss"]
})
export class ChefDashboardComponent {
  constructor() {}

  // this.activeRoute.params.subscribe((params: any) => {
  //   if (!params.id) {
  //     this.router.navigate(["chef", this.orders[0].id]);
  //   }
  // });
}
