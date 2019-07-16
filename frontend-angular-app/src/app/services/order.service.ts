import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Order } from "../models/Order";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor() {}

  getOrder(): Observable<Order[]> {
    return of([
      {
        id: "0",
        table: {
          id: "1",
          seats: 4,
          free: false
        },
        dishes: [
          {
            id: "0",
            category: "antipasti",
            name: "baccala ecca la",
            price: 33,
            quantity: 0,
            done: false
          }
        ],
        waiter: "halal"
      },
      {
        id: "2",
        table: {
          id: "3",
          seats: 10,
          free: false
        },
        dishes: [
          {
            id: "0",
            category: "primi",
            name: "basta",
            price: 33,
            quantity: 0,
            done: false
          }
        ],
        waiter: "halal"
      }
    ]);
  }
}
