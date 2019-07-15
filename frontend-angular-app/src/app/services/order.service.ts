import { Injectable } from "@angular/core";
import { Order } from "../models/Order";
import { Observable, of } from "rxjs";
import { DishStatus } from "../models/Dish";

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
          status: DishStatus["Waiting"]
        },
        {
          id: "2",
          category: "Primi",
          name: "Pizza",
          price: 2,
          quantity: 1,
          status: DishStatus["Waiting"]
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
          status: DishStatus["Waiting"]
        }
      ]
    },
    {
      id: "3",
      table: {
        id: "3",
        seats: 2,
        free: false
      },
      waiter: "tu",
      dishes: [
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          status: DishStatus["Waiting"]
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
          status: DishStatus["Waiting"]
        }
      ]
    }
  ];

  constructor() {}

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrder(id): Observable<Order> {
    const found: Order = this.orders.find(order => order.id === id);
    return of(found);
  }
}
