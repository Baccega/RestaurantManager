import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { Subscription } from "rxjs";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/models/Order";

@Component({
  selector: "app-cashier-view-order",
  templateUrl: "./cashier-view-order.component.html",
  styleUrls: ["./cashier-view-order.component.scss"]
})
export class CashierViewOrderComponent implements OnInit, OnDestroy {
  tableId: string;
  orders: Order[] = [];
  routeSub: Subscription;
  ordersSub: Subscription;
  orderSub: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.tableId = params["table"];
      this.utilService.setTitle(`Table: ${this.tableId}`);
      this.ordersSub = this.orderService
        .getOrders(this.tableId)
        .subscribe(newOrders =>
          newOrders.forEach((order, index) => {
            this.orderSub[index] = this.orderService
              .getOrder(order.id)
              .subscribe(newOrder => (this.orders[index] = newOrder));
          })
        );
    });
  }

  ngOnDestroy() {
    this.orderSub.forEach(sub => sub.unsubscribe());
    this.ordersSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  navigateToDashboard() {
    this.router.navigate(["cashier", "dashboard"]);
  }

  navigateToBill() {
    this.router.navigate(["./bill"], { relativeTo: this.activatedRoute });
  }
}
