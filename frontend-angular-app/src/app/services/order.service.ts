import { Injectable } from "@angular/core";
import { Order, FoodStatus, DrinkStatus } from "../models/Order";
import { Observable, of, throwError } from "rxjs";
import { DishStatus, Dish } from "../models/Dish";

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private orders: Order[] = [
    {
      id: "1",
      table: "1",
      waiter: "io",
      drinkStatus: DrinkStatus["Waiting"],
      foodStatus: FoodStatus["Waiting"],
      dishes: [
        {
          id: "1",
          category: "Primi",
          name: "Pasta",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "2",
          category: "Primi",
          name: "Pizza",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        }
      ]
    },
    {
      id: "2",
      table: "2",
      waiter: "1",
      drinkStatus: DrinkStatus["Ready"],
      foodStatus: FoodStatus["Preparing"],
      dishes: [
        {
          id: "1",
          category: "Primi",
          name: "Pasta1",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        }
      ]
    },
    {
      id: "3",
      table: "3",
      waiter: "1",
      drinkStatus: DrinkStatus["Delivered"],
      foodStatus: FoodStatus["Delivered"],
      dishes: [
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        }
      ]
    },
    {
      id: "2",
      table: "2",
      waiter: "1",
      drinkStatus: DrinkStatus["Ready"],
      foodStatus: FoodStatus["Ready"],
      dishes: [
        {
          id: "1",
          category: "Primi",
          name: "Pasta2",
          price: 2,
          quantity: 1,
          handler: "someone",
          preparation: "10",
          status: DishStatus["Waiting"]
        }
      ]
    }
  ];

  constructor() {}

  getOrders(tableId = ""): Observable<Order[]> {
    return of(this.orders.filter(el => el.table !== tableId));
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

  setOrderFoodStatus(id: String, newStatus: FoodStatus) {
    return new Promise(resolve => {
      setTimeout(() => {
        const order = this.orders.find(order => order.id === id);
        order.foodStatus = newStatus;
        resolve();
      }, 3000);
    });
  }

  setOrderDrinkStatus(id: String, newStatus: DrinkStatus) {
    return new Promise(resolve => {
      setTimeout(() => {
        const order = this.orders.find(order => order.id === id);
        order.drinkStatus = newStatus;
        resolve();
      }, 3000);
    });
  }

  setDishStatus(id: String, dishIndex: number, newStatus: DishStatus) {
    return new Promise(resolve => {
      setTimeout(() => {
        const order = this.orders.find(order => order.id === id);
        order.dishes[dishIndex].status = newStatus;
        order.foodStatus = FoodStatus["Preparing"];

        resolve();
      }, 500);
    });
  }
}
