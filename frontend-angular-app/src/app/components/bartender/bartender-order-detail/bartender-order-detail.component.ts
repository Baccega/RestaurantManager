import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { Subscription } from "rxjs";
import { Order, OrderStatus } from "src/app/models/Order";
import { SocketService } from "src/app/services/socket.service";

@Component({
  selector: "app-bartender-order-detail",
  templateUrl: "./bartender-order-detail.component.html",
  styleUrls: ["./bartender-order-detail.component.scss"]
})
export class BartenderOrderDetailComponent implements OnInit, OnDestroy {
  order: Order = {
    orderId: "0",
    dishes: [],
    drinkStatus: 0,
    foodStatus: 0,
    table: "0",
    waiter: ""
  };

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
      this.orderServiceSub = this.orderService.getOrder(id).subscribe(
        order => (this.order = order),
        err => {
          console.error(err);
          this.router.navigate(["../"], { relativeTo: this.activatedRoute });
        }
      );
    });

    this.socketService.initSocket();
    this.socketService
      .listen<Order>("updated-order")
      .subscribe(updatedOrder => {
        console.log("Received Update");
        if (this.order.orderId == updatedOrder.orderId) {
          this.order = {
            ...updatedOrder,
            dishes: updatedOrder.dishes.filter(
              dish => dish.category == "Bevande"
            )
          };
        }
      });
  }

  ngOnDestroy() {
    this.orderServiceSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  async startOrder() {
    this.utilsService.setProgressbar(true);
    this.order.drinkStatus = 1;
    await this.orderService.setOrderDrinkStatus(
      this.order.orderId,
      OrderStatus["Preparing"]
    );
    this.utilsService.setProgressbar(false);
  }

  async finishOrder() {
    this.utilsService.setProgressbar(true);
    this.order.drinkStatus = 2;
    await this.orderService.setOrderDrinkStatus(
      this.order.orderId,
      OrderStatus["Ready"]
    );
    this.utilsService.setProgressbar(false);
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }
}
