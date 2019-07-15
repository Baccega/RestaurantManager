import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-generic-block-list",
  templateUrl: "./generic-block-list.component.html",
  styleUrls: ["./generic-block-list.component.scss"]
})
export class GenericBlockListComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => (this.orders = orders));
  }

  navigateTo(id: string) {
    this.router.navigate(["chef", id]);
  }
}
