import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Dish } from "src/app/models/Dish";
import { DishService } from "../../../services/dish.service";
import { Observable } from "rxjs";
import { Menu } from "src/app/models/Menu";

@Component({
  selector: "app-waiter-new-table",
  templateUrl: "./waiter-new-table.component.html",
  styleUrls: ["./waiter-new-table.component.scss"]
})
export class WaiterNewTableComponent implements OnInit {
  menu: Menu[];

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.dishService.getMenu().subscribe(menu => {
      this.menu = menu;
      console.log(this.menu);
    });
  }

  addQuantity(i: number, j: number) {
    this.menu[i].dishes[j].quantity += 1;
    console.log(this.menu[i].dishes[j]);
  }
  removeQuantity(i: number, j: number) {
    if (this.menu[i].dishes[j].quantity > 0)
      this.menu[i].dishes[j].quantity -= 1;
    console.log(this.menu[i].dishes[j].quantity);
  }

  sendOrder(): void {
    let order: Dish[] = [];
    for (let elem of this.menu) {
      for (let dish of elem.dishes) if (dish.quantity > 0) order.push(dish);
    }
    console.log(order);
    this.dishService.sendOrder(order);
  }
}
