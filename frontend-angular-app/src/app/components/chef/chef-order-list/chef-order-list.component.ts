import { Component, OnInit, OnDestroy } from "@angular/core";
import { Order } from "src/app/models/Order";
import { OrderService } from "src/app/services/order.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-chef-order-list",
  templateUrl: "./chef-order-list.component.html",
  styleUrls: ["./chef-order-list.component.scss"]
})
export class ChefOrderListComponent implements OnInit, OnDestroy {
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
    this.router.navigate(["chef", id]);
  }
}
