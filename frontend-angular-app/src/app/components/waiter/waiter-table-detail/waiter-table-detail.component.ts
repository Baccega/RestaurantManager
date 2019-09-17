import { Component, OnInit, Output, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { OrderService } from "src/app/services/order.service";
import { Order, OrderStatus } from "src/app/models/Order";
import { Subscription } from "rxjs";
import { SocketService } from "src/app/services/socket.service";

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
    private orderService: OrderService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.socketService.initSocket();
    this.socketService
      .listen<Order>("updated-order")
      .subscribe(updatedOrder => {
        console.log("Received update");
        if (
          this.tableOrders.find(order => order.orderId == updatedOrder.orderId)
        ) {
          console.log("Found");
          this.tableOrders = this.tableOrders.map(order =>
            order.orderId == updatedOrder.orderId ? updatedOrder : order
          );
        }
      });

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
  private async served(what, index) {
    if (what == "food") {
      this.tableOrders[index].foodStatus = OrderStatus["Delivered"];
      await this.orderService.setOrderFoodStatus(
        this.tableOrders[index].orderId,
        OrderStatus["Delivered"]
      );
    } else if (what == "drink") {
      this.tableOrders[index].drinkStatus = OrderStatus["Delivered"];
      await this.orderService.setOrderDrinkStatus(
        this.tableOrders[index].orderId,
        OrderStatus["Delivered"]
      );
    }
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  goToNewOrder() {
    this.router.navigate(["waiter", "new-order", this.tableId]);
  }
}
