import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
@Component({
  selector: "app-waiter-dashboard",
  templateUrl: "./waiter-dashboard.component.html",
  styleUrls: ["./waiter-dashboard.component.scss"]
})
export class WaiterDashboardComponent implements OnInit, OnDestroy {
  id: String = "";
  sub: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onClick() {
    this.router.navigate(["waiter", "dashboard", this.id, "new-order"]);
  }
}
