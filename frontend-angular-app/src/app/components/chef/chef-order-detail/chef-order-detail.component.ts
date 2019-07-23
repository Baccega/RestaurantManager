import { Component, OnInit, OnDestroy } from "@angular/core";
import { DishStatus } from "src/app/models/Dish";
import { Order, OrderStatus } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-chef-order-detail",
  templateUrl: "./chef-order-detail.component.html",
  styleUrls: ["./chef-order-detail.component.scss"]
})
export class ChefOrderDetailComponent implements OnInit, OnDestroy {
  order: Order;
  orderServiceSub: Subscription;
  routerSub: Subscription;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.routerSub = this.activatedRoute.params.subscribe((params: Params) => {
      const id = params["id"];
      this.utilsService.setId(id);
      this.orderServiceSub = this.orderService.getOrder(id).subscribe(
        order => (this.order = order),
        err => {
          console.error(err);
          this.router.navigate(["chef"]);
        }
      );
    });
  }

  ngOnDestroy() {
    this.orderServiceSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  async startDish(index) {
    this.utilsService.setProgressbar(true);
    console.log("started " + index);
    this.order.dishes[index].status = DishStatus["Started"];
    await this.orderService.setDishStatus(
      this.order.id,
      index,
      DishStatus["Started"]
    );
    console.log("finished " + index);
    this.utilsService.setProgressbar(false);
  }

  async finishDish(index) {
    this.order.dishes[index].status = DishStatus["Finished"];
    if (
      this.order.dishes.filter(ord => ord.status != DishStatus["Finished"])
        .length == 0
    ) {
      this.utilsService.setProgressbar(true);
      await this.orderService.setOrderStatus(
        this.order.id,
        OrderStatus["Ready"]
      );
      this.utilsService.setProgressbar(false);
      this.router.navigate(["/chef"]);
    }
  }
}
