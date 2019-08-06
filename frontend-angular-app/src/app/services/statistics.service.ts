import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
  today = {
    customersServed: 10,
    profit: 100
  };

  scode = {
    preparedDishes: 0,
    customersServed: 100
  };

  constructor() {}

  getTodayStatistics() {
    return this.today;
  }

  getTodayEmployeeStatistics(id) {
    return this.scode;
  }
}
