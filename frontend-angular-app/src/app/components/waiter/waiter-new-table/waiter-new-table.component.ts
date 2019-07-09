import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Dish } from "src/app/models/Dish";
import { DishService } from "src/app/services/dish.service";
import { OrderDetailComponent } from "../../order-detail/order-detail.component";
import { Observable } from "rxjs";

@Component({
  selector: "app-waiter-new-table",
  templateUrl: "./waiter-new-table.component.html",
  styleUrls: ["./waiter-new-table.component.scss"]
})
export class WaiterNewTableComponent implements OnInit {
  menu: Dish[];

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.dishService.getMenu().subscribe(menu => (this.menu = menu));
  }

  addQuantity(elem) {
    this.menu[elem].quantity += 1;
    console.log(elem);
  }
  removeQuantity(elem) {
    if (this.menu[elem].quantity > 0) this.menu[elem].quantity -= 1;
    console.log(elem);
  }

  sendOrder():void {
    let order: Dish[] = [];
    for (let elem of this.menu) {
      if (elem.quantity > 0) order.push(elem);
    }
    console.log(order);
    this.dishService.sendOrder(order);
  }
}
