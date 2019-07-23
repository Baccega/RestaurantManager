import { Injectable } from "@angular/core";
import { Order, OrderStatus } from "../models/Order";
import { Observable, of, throwError } from "rxjs";
import { DishStatus, Dish } from "../models/Dish";

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
      status: OrderStatus["Waiting"],
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
      status: OrderStatus["Preparing"],
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
      status: OrderStatus["Delivered"],
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
      status: OrderStatus["Ready"],
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

  getOrders(tableId = ""): Observable<Order[]> {
    return of(this.orders.filter(el => el.table.id !== tableId));
  }

  getOrder(id): Observable<Order> {
    const found: Order = this.orders.find(order => order.id === id);
    if (found) {
      return of(found);
    } else {
      return throwError(`Order "${id}" not found`);
    }
  }

  sendOrder(order: Dish[]) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }

  setOrderStatus(id: String, newStatus: OrderStatus) {
    return new Promise(resolve => {
      setTimeout(() => {
        const order = this.orders.find(order => order.id === id);
        order.status = newStatus;
        resolve();
      }, 3000);
    });
  }

  setDishStatus(id: String, dishIndex: number, newStatus: DishStatus) {
    return new Promise(resolve => {
      setTimeout(() => {
        const order = this.orders.find(order => order.id === id);
        order.dishes[dishIndex].status = newStatus;
        order.status = OrderStatus["Preparing"];

        resolve();
      }, 500);
    });
  }
}
