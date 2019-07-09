import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/models/Order";

@Component({
  selector: "app-chef-dashboard",
  templateUrl: "./chef-dashboard.component.html",
  styleUrls: ["./chef-dashboard.component.scss"]
})
export class ChefDashboardComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => (this.orders = orders));
  }
}
