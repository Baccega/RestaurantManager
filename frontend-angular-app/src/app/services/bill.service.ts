import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Order, OrderStatus } from "../models/Order";
import { DishStatus } from "../models/Dish";
import { Course } from "../models/Course";

@Injectable({
  providedIn: "root"
})
export class BillService {
  orders: Course[] = [
    {
      id: "1",
      name: "antipasti",
      dishes: [
        {
          dishId: "0",
          preparation: "10",
          category: "antipasti",
          name: "baccala ecca la",
          price: 33,
          quantity: 1,
          status: DishStatus["Finished"]
        },
        {
          dishId: "0",
          preparation: "10",
          category: "antipasti",
          name: "baccala ecca la",
          price: 33,
          quantity: 2,
          status: DishStatus["Finished"]
        }
      ]
    }
  ];

  constructor() {}

  createBill(tableId) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }

  getBill(tableId): Observable<Course[]> {
    return of(this.orders);
  }
}
