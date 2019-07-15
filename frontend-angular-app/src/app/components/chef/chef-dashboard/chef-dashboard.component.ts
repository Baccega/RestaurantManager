import { Component, OnInit, OnDestroy } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { Order } from "src/app/models/Order";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-chef-dashboard",
  templateUrl: "./chef-dashboard.component.html",
  styleUrls: ["./chef-dashboard.component.scss"]
})
export class ChefDashboardComponent implements OnInit, OnDestroy {
  orders: Order[];
  orderSub: Subscription;

  constructor(
    private orderService: OrderService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.orderSub = this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });

    // this.activeRoute.params.subscribe((params: any) => {
    //   if (!params.id) {
    //     this.router.navigate(["chef", this.orders[0].id]);
    //   }
    // });
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }
}
