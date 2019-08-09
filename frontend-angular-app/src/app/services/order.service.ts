import { Injectable } from "@angular/core";
import { Order, OrderStatus } from "../models/Order";
import { Observable, of, throwError } from "rxjs";
import { DishStatus, Dish } from "../models/Dish";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("token")
  })
};

@Injectable({
  providedIn: "root"
})
export class OrderService {
  private orders: Order[] = [
    {
      id: "1",
      table: "1",
      waiter: "io",
      drinkStatus: OrderStatus["Waiting"],
      foodStatus: OrderStatus["Waiting"],
      dishes: [
        {
          id: "1",
          category: "Primi",
          name: "Pasta",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "2",
          category: "Primi",
          name: "Pizza",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        }
      ]
    },
    {
      id: "2",
      table: "2",
      waiter: "1",
      drinkStatus: OrderStatus["Ready"],
      foodStatus: OrderStatus["Preparing"],
      dishes: [
        {
          id: "1",
          category: "Primi",
          name: "Pasta1",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        }
      ]
    },
    {
      id: "3",
      table: "3",
      waiter: "1",
      drinkStatus: OrderStatus["Delivered"],
      foodStatus: OrderStatus["Delivered"],
      dishes: [
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        },
        {
          id: "1",
          category: "Prim12wefi",
          name: "Pasta2s",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        }
      ]
    },
    {
      id: "2",
      table: "2",
      waiter: "1",
      drinkStatus: OrderStatus["Ready"],
      foodStatus: OrderStatus["Ready"],
      dishes: [
        {
          id: "1",
          category: "Primi",
          name: "Pasta2",
          price: 2,
          quantity: 1,
          preparation: "10",
          status: DishStatus["Waiting"]
        }
      ]
    }
  ];

  constructor(private http: HttpClient) {}

  getOrders(tableId = ""): Observable<Order[]> {
    tableId = tableId != "" ? `/tables/${tableId}` : "";
    return this.http.get<Order[]>(
      `${environment.serverUrl}/orders${tableId}`,
      httpOption
    );
  }

  getOrder(orderId): Observable<Order> {
    return this.http.get<Order>(
      `${environment.serverUrl}/orders/${orderId}`,
      httpOption
    );
  }

  sendOrder(data): Promise<any> {
    return this.http
      .post<Order[]>(`${environment.serverUrl}/orders/`, data, httpOption)
      .toPromise();

    /*
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });*/
  }

  setOrderFoodStatus(id: String, newStatus: OrderStatus) {
    return new Promise(resolve => {
      setTimeout(() => {
        const order = this.orders.find(order => order.id === id);
        order.foodStatus = newStatus;
        resolve();
      }, 3000);
    });
  }

  setOrderDrinkStatus(id: String, newStatus: OrderStatus) {
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
        order.foodStatus = OrderStatus["Preparing"];

        resolve();
      }, 500);
    });
  }
}
