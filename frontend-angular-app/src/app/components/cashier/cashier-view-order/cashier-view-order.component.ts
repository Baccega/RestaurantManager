import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cashier-view-order",
  templateUrl: "./cashier-view-order.component.html",
  styleUrls: ["./cashier-view-order.component.scss"]
})
export class CashierViewOrderComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  navigateToDashboard() {
    this.router.navigate(["cashier", "dashboard"]);
  }

  navigateToBill() {
    this.router.navigate(["./bill"], { relativeTo: this.activatedRoute });
  }
}
