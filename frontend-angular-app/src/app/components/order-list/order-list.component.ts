import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { Subscription } from "rxjs";
import { Source } from "webpack-sources";

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
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderSub = this.orderService
      .getOrders()
      .subscribe(orders => (this.orders = orders));

    this.utilsSub = this.utilsService.watchId().subscribe(newId => {
      this.id = newId;
    });
  }
  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }

  navigateTo(id: string) {
    this.router.navigate(["./", id], { relativeTo: this.activatedRoute });
  }
}
