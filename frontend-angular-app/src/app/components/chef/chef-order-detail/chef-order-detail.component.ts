import { Component, OnInit, Input } from "@angular/core";
import { DishStatus } from "src/app/models/Dish";
import { Order } from "src/app/models/Order";

@Component({
  selector: "app-chef-order-detail",
  templateUrl: "./chef-order-detail.component.html",
  styleUrls: ["./chef-order-detail.component.scss"]
})
export class ChefOrderDetailComponent implements OnInit {
  @Input() order: Order;

  constructor() {}

  ngOnInit() {}

  startDish(index) {
    this.order.dishes[index].status = DishStatus["Started"];
  }

  finishDish(index) {
    this.order.dishes[index].status = DishStatus["Finished"];
  }
}
