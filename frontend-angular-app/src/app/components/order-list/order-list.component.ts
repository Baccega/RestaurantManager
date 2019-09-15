import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { Subscription } from "rxjs";
import { Source } from "webpack-sources";
import { SocketService } from "src/app/services/socket.service";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent implements OnInit, OnDestroy {
  @Input() source: string;
  orders: Order[];
  id: String;
  orderSub: Subscription;
  utilsSub: Subscription;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.utilsService.setProgressbar(true);
    this.orderSub = this.orderService.getOrders().subscribe(orders => {
      this.utilsService.setProgressbar(false);
      this.orders = orders;
    });

    this.utilsSub = this.utilsService.watchId().subscribe(newId => {
      this.id = newId;
    });

    this.socketService.initSocket();
    this.socketService
      .listen<Order>("updated-order")
      .subscribe(updatedOrder => {
        console.log("Received Update");
        if (
          (this.source == "chef" && updatedOrder.foodStatus > 1) ||
          (this.source == "bartender" && updatedOrder.drinkStatus > 1)
        ) {
          this.orders = this.orders.filter(
            order => order.orderId != updatedOrder.orderId
          );
        } else if (
          this.orders.find(order => order.orderId == updatedOrder.orderId)
        ) {
          this.orders = this.orders.map(order =>
            order.orderId == updatedOrder.orderId ? updatedOrder : order
          );
        }
      });
    this.socketService.listen<Order>("new-order").subscribe(newOrder => {
      console.log("Received new order");
      const filtered =
        this.source == "bartender"
          ? {
              ...newOrder,
              dishes: newOrder.dishes.filter(dish => dish.category == "Bevande")
            }
          : {
              ...newOrder,
              dishes: newOrder.dishes.filter(dish => dish.category != "Bevande")
            };
      if (newOrder.dishes.length > 0) {
        this.orders.push(newOrder);
      }
    });
  }
  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }

  navigateTo(id: string) {
    this.router.navigate(["./", id], { relativeTo: this.activatedRoute });
  }
}
