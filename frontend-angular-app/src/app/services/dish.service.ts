import { Injectable } from "@angular/core";
import { Dish, DishStatus } from "../models/Dish";
import { Observable, of } from "rxjs";
import { Menu } from "../models/Menu";
import { HttpClient } from '@angular/common/http';


const url = "http://localhost:3000/courses";

@Injectable({
  providedIn: "root"
})
export class DishService {
  ordersDish: Dish[][] = [];

  constructor(private http: HttpClient) {}

  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(url, {responseType: 'json'});
  }

  sendOrder(order: Dish[]) {
    this.ordersDish.push(order);
  }
}
