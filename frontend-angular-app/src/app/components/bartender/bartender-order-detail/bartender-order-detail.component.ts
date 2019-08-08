import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { Subscription } from "rxjs";
import { Order, DrinkStatus, FoodStatus } from "src/app/models/Order";

@Component({
  selector: "app-bartender-order-detail",
  templateUrl: "./bartender-order-detail.component.html",
  styleUrls: ["./bartender-order-detail.component.scss"]
})
export class BartenderOrderDetailComponent implements OnInit, OnDestroy {
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
          this.router.navigate(["../"], { relativeTo: this.activatedRoute });
        }
      );
    });
  }

  ngOnDestroy() {
    this.orderServiceSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  async startOrder() {
    this.order.drinkStatus = 1; // OrderStatus["Preparing"]
    // post to backend
  }

  async finishOrder() {
    this.order.drinkStatus = 2; // OrderStatus["Preparing"]
    // post to backend
  }
}
