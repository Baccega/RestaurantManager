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
      this.utilsService.setProgressbar(true);
      this.orderServiceSub = this.orderService.getOrder(id).subscribe(
        order => {
          this.utilsService.setProgressbar(false);
          this.order = order[0]; // Per qualche motivo mi torna un array
        },
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

  async setDishStatus(index, newStatus) {
    this.utilsService.setProgressbar(true);
    this.order.dishes[index].status = newStatus;
    await this.orderService.setDishStatus(this.order.id, index, newStatus);
    this.utilsService.setProgressbar(false);
  }

  async startDish(index) {
    await this.setDishStatus(index, DishStatus["Started"]);
  }

  async finishDish(index) {
    await this.setDishStatus(index, DishStatus["Finished"]);
    if (
      this.order.dishes.filter(ord => ord.status != DishStatus["Finished"])
        .length == 0
    ) {
      this.utilsService.setProgressbar(true);
      await this.orderService.setOrderFoodStatus(
        this.order.id,
        OrderStatus["Ready"]
      );
      this.utilsService.setProgressbar(false);
      this.router.navigate(["/chef"]);
    }
  }
}
