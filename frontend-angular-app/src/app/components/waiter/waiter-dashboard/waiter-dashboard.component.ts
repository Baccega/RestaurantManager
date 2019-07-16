import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-waiter-dashboard",
  templateUrl: "./waiter-dashboard.component.html",
  styleUrls: ["./waiter-dashboard.component.scss"]
})
export class WaiterDashboardComponent {
  constructor(private router: Router) {}

  onClick() {
    this.router.navigate(["waiter", "1", "new-order"]);
  }
}
