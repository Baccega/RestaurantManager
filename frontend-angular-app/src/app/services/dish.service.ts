import { Injectable } from "@angular/core";
import { Dish, DishStatus } from "../models/Dish";
import { Observable, of } from "rxjs";
import { Menu } from "../models/Menu";

@Injectable({
  providedIn: "root"
})
export class DishService {
  ordersDish: Dish[][] = [];

  constructor() {}

  getMenu(): Observable<Menu[]> {
    return of([
      {
        category: "antipasti",
        dishes: [
          {
            id: "0",
            category: "antipasti",
            name: "baccala ecca la",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          },
          {
            id: "0",
            category: "antipasti",
            name: "baccala ecca la",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          },
          {
            id: "0",
            category: "antipasti",
            name: "baccala ecca la",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          }
        ]
      },

      {
        category: "primi",
        dishes: [
          {
            id: "0",
            category: "primi",
            name: "basta",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          },
          {
            id: "0",
            category: "primi",
            name: "lisotto",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          },
          {
            id: "0",
            category: "primi",
            name: "blodo",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          }
        ]
      },
      {
        category: "secondi",
        dishes: [
          {
            id: "0",
            category: "secondi",
            name: "pesse",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          },
          {
            id: "0",
            category: "secondi",
            name: "bistecca",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          },
          {
            id: "0",
            category: "secondi",
            name: "piadina",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          }
        ]
      },
      {
        category: "bevande",
        dishes: [
          {
            id: "0",
            category: "bevande",
            name: "acqua",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          },
          {
            id: "0",
            category: "bevande",
            name: "vino",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          },
          {
            id: "0",
            category: "bevande",
            name: "aria",
            price: 33,
            quantity: 0,
            status: DishStatus["Waiting"]
          }
        ]
      }
    ]);
  }

  sendOrder(order: Dish[]) {
    this.ordersDish.push(order);
  }
}
