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
  }

  setOrderFoodStatus(id: String, newStatus: OrderStatus) {
    const data = { foodStatus: newStatus };
    return this.http
      .post<Order>(`${environment.serverUrl}/orders/${id}`, data, httpOption)
      .toPromise();
  }

  setOrderDrinkStatus(id: String, newStatus: OrderStatus) {
    const data = { drinkStatus: newStatus };
    return this.http
      .post<Order>(`${environment.serverUrl}/orders/${id}`, data, httpOption)
      .toPromise();
  }

  setDishStatus(id: String, dishId: String, newStatus: DishStatus) {
    const data = { status: newStatus };
    return this.http
      .post<Dish>(
        `${environment.serverUrl}/orders/${id}/${dishId}`,
        data,
        httpOption
      )
      .toPromise();
  }
}
