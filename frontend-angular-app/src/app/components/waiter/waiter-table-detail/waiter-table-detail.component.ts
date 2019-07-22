import { Component, OnInit, Output, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/models/Order";
import { Subscription } from "rxjs";

@Component({
  selector: "app-waiter-table-detail",
  templateUrl: "./waiter-table-detail.component.html",
  styleUrls: ["./waiter-table-detail.component.scss"]
})
export class WaiterTableDetailComponent implements OnInit, OnDestroy {
  tableId = "";
  tableOrders: Order[];
  ordersSub: Subscription;
  routeSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utils: UtilsService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe((par: Params) => {
      if (par["id"]) {
        this.tableId = par["id"];
        this.utils.setId(par["id"]);
        this.ordersSub = this.orderService
          .getOrders(par["id"])
          .subscribe(newOrders => {
            this.tableOrders = newOrders;
          });
      }
    });
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  goToNewOrder() {
    this.router.navigate(["waiter", "new-order", this.tableId]);
  }
}