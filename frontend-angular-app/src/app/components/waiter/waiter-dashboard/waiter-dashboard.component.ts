import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-waiter-dashboard",
  templateUrl: "./waiter-dashboard.component.html",
  styleUrls: ["./waiter-dashboard.component.scss"]
})
export class WaiterDashboardComponent implements OnInit {
  private orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => (this.orders = orders));
  }

  onClick() {
    console.log("wedfsg");
  }
}
