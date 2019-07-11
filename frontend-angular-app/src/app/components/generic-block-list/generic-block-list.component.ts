import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-generic-block-list",
  templateUrl: "./generic-block-list.component.html",
  styleUrls: ["./generic-block-list.component.scss"]
})
export class GenericBlockListComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => (this.orders = orders));
  }
}
