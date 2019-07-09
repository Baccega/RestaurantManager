import { Injectable } from "@angular/core";
import { Order } from "../models/Order";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private orders: Order[] = [
    {
      id: "1",
      table: {
        id: "1",
        seats: 2,
        free: false
      },
      waiter: "io",
      dishes: [
        {
          id: "1",
          category: "Primi",
          name: "Pasta",
          price: 2,
          quantity: 1,
          done: false
        },
        {
          id: "2",
          category: "Primi",
          name: "Pizza",
          price: 2,
          quantity: 1,
          done: false
        }
      ]
    },
    {
      id: "2",
      table: {
        id: "2",
        seats: 2,
        free: false
      },
      waiter: "tu",
      dishes: [
        {
          id: "1",
          category: "Primi",
          name: "Pasta1",
          price: 2,
          quantity: 1,
          done: false
        }
      ]
    },
    {
      id: "2",
      table: {
        id: "2",
        seats: 2,
        free: false
      },
      waiter: "tu",
      dishes: [
        {
          id: "1",
          category: "Primi",
          name: "Pasta2",
          price: 2,
          quantity: 1,
          done: false
        }
      ]
    }
  ];

  constructor() {}

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }
}
