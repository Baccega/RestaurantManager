import { Injectable } from "@angular/core";
import { Dish } from "../models/Dish";
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
            done: false
          },
          {
            id: "0",
            category: "antipasti",
            name: "baccala ecca la",
            price: 33,
            quantity: 0,
            done: false
          },
          {
            id: "0",
            category: "antipasti",
            name: "baccala ecca la",
            price: 33,
            quantity: 0,
            done: false
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
            done: false
          },
          {
            id: "0",
            category: "primi",
            name: "lisotto",
            price: 33,
            quantity: 0,
            done: false
          },
          {
            id: "0",
            category: "primi",
            name: "blodo",
            price: 33,
            quantity: 0,
            done: false
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
            done: false
          },
          {
            id: "0",
            category: "secondi",
            name: "bistecca",
            price: 33,
            quantity: 0,
            done: false
          },
          {
            id: "0",
            category: "secondi",
            name: "piadina",
            price: 33,
            quantity: 0,
            done: false
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
            done: false
          },
          {
            id: "0",
            category: "bevande",
            name: "vino",
            price: 33,
            quantity: 0,
            done: false
          },
          {
            id: "0",
            category: "bevande",
            name: "aria",
            price: 33,
            quantity: 0,
            done: false
          }
        ]
      }
    ]);
  }

  sendOrder(order: Dish[]) {
    this.ordersDish.push(order);
  }
}
