import { Component, OnInit, OnDestroy } from "@angular/core";
import { DishStatus } from "src/app/models/Dish";
import { Order } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-chef-order-detail",
  templateUrl: "./chef-order-detail.component.html",
  styleUrls: ["./chef-order-detail.component.scss"]
})
export class ChefOrderDetailComponent implements OnInit, OnDestroy {
  order: Order;
  orderServiceSub: Subscription;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");

    this.orderServiceSub = this.orderService
      .getOrder(id)
      .subscribe(order => (this.order = order));
  }

  ngOnDestroy() {
    this.orderServiceSub.unsubscribe();
  }

  startDish(index) {
    this.order.dishes[index].status = DishStatus["Started"];
  }

  finishDish(index) {
    this.order.dishes[index].status = DishStatus["Finished"];
  }
}
