import { Injectable } from "@angular/core";
import { stringify } from "@angular/compiler/src/util";

@Injectable({
  providedIn: "root"
})
enum Categories {
  antipasti,
  primi,
  secondi,
  dolci,
  bevande
}

export class DishService {
  constructor() {}

  getMenu() {
    return [
      {
        category: Categories.antipasti,
        name: "baccala ecca la",
        price: 33,
        quantity: 0,
        done: false
      },
    ];
  }
}
