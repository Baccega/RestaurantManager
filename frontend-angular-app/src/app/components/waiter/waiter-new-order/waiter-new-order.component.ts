import { Component, OnInit, OnDestroy } from "@angular/core";
import { Dish } from "src/app/models/Dish";
import { DishService } from "src/app/services/dish.service";
import { Menu } from "src/app/models/Menu";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";
import { OrderService } from "src/app/services/order.service";

function flattenMenu(menu: Menu[]) {
  return menu.reduce((prev: Dish[], el) => [...prev, ...el.dishes], []);
}

@Component({
  selector: "app-waiter-new-order",
  templateUrl: "./waiter-new-order.component.html",
  styleUrls: ["./waiter-new-order.component.scss"]
})
export class WaiterNewOrderComponent implements OnInit, OnDestroy {
  menu: Menu[];
  tableId: String;
  waitingPromise: boolean = false;
  sendedDishes = 0;
  routerSub: Subscription;
  dishSub: Subscription;

  constructor(
    private dishService: DishService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("New Order");
    this.dishSub = this.dishService
      .getMenu()
      .subscribe(menu => (this.menu = menu));
    this.routerSub = this.activatedRoute.params.subscribe(
      params => (this.tableId = params["id"])
    );
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.dishSub.unsubscribe();
  }

  addQuantity(i: number, j: number) {
    this.sendedDishes++;
    this.menu[i].dishes[j].quantity += 1;
  }

  removeQuantity(i: number, j: number) {
    if (this.menu[i].dishes[j].quantity > 0) {
      this.sendedDishes--;
      this.menu[i].dishes[j].quantity -= 1;
    }
  }

  async sendOrder() {
    const order = flattenMenu(this.menu).filter(dish => dish.quantity > 0);
    this.utilsService.setProgressbar(true);
    await this.orderService.sendOrder(order);
    this.utilsService.setProgressbar(false);
    this.router.navigate(["/waiter", "dashboard", this.tableId], {
      queryParams: { result: "success" }
    });
  }

  cancelOrder(): void {
    this.router.navigate(["/waiter", "dashboard", this.tableId]);
  }
}
