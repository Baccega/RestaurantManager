import { Component, OnInit, OnDestroy } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BillService } from "src/app/services/bill.service";
import { Subscription } from "rxjs";
import { Order } from "src/app/models/Order";
import { Dish } from "src/app/models/Dish";

@Component({
  selector: "app-cashier-bill",
  templateUrl: "./cashier-bill.component.html",
  styleUrls: ["./cashier-bill.component.scss"]
})
export class CashierBillComponent implements OnInit, OnDestroy {
  tableId;
  orders: Order[];
  total: number;
  routerSub: Subscription;
  orderSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService,
    private billService: BillService
  ) {}

  ngOnInit() {
    this.routerSub = this.activatedRoute.paramMap.subscribe(
      ({ params }: any) => {
        this.tableId = params["table"];
        this.orderSub = this.billService
          .getBill(this.tableId)
          .subscribe(newOrders => {
            this.utilService.setTitle(`Table: ${this.tableId} - Bill`);
            this.orders = newOrders;
            this.total = this.calcTotal(newOrders);
          });
      }
    );
  }
  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.orderSub.unsubscribe();
  }

  private calcTotal(courses: Order[]): number {
    let tot = 0;
    courses.forEach(course => {
      course.dishes.forEach(dish => {
        tot += dish.price * dish.quantity;
      });
    });
    return tot;
  }

  private mergeDishes(orders: Order[]) {
    return orders.reduce(
      (prev: Dish[], order) => [...prev, ...order.dishes],
      []
    );
  }

  navigateToOrder() {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }

  async createBill() {
    this.utilService.setProgressbar(true);
    await this.billService.createBill(
      this.tableId,
      this.total,
      this.mergeDishes(this.orders)
    );
    this.utilService.setProgressbar(false);
    this.router.navigate(["cashier", "dashboard"]);
  }
}
