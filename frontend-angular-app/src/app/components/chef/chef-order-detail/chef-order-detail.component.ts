import { Component, OnInit, OnDestroy } from "@angular/core";
import { DishStatus } from "src/app/models/Dish";
import { Order, OrderStatus } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";
import { SocketService } from "src/app/services/socket.service";

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
    private utilsService: UtilsService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.routerSub = this.activatedRoute.params.subscribe((params: Params) => {
      const id = params["id"];
      this.utilsService.setId(id);
      this.utilsService.setProgressbar(true);
      this.orderServiceSub = this.orderService.getOrder(id).subscribe(
        order => {
          this.utilsService.setProgressbar(false);
          this.order = order;
        },
        err => {
          console.error(err);
          this.router.navigate(["chef"]);
        }
      );
    });
    this.socketService.initSocket();
    this.socketService
      .listen<Order>("updated-plate")
      .subscribe(updatedOrder => {
        console.log("Received Update");
        if (this.order.orderId == updatedOrder.orderId) {
          this.order = updatedOrder;
        }
      });
  }

  ngOnDestroy() {
    this.orderServiceSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  async setDishStatus(index, newStatus) {
    this.utilsService.setProgressbar(true);
    this.order.dishes[index].status = newStatus;
    await this.orderService.setDishStatus(
      this.order.orderId,
      this.order.dishes[index].dishId,
      newStatus
    );
    this.utilsService.setProgressbar(false);
  }

  async startDish(index) {
    if (this.order.foodStatus == OrderStatus["Waiting"]) {
      this.order.foodStatus = OrderStatus["Waiting"];
      await this.orderService.setOrderFoodStatus(
        this.order.orderId,
        OrderStatus["Preparing"]
      );
    }
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
        this.order.orderId,
        OrderStatus["Ready"]
      );
      this.utilsService.setProgressbar(false);
      this.router.navigate(["/chef"]);
    }
  }

  private timeSort(dishes) {
    return dishes.sort((dish, succ) => succ.preparation - dish.preparation);
  }
}
