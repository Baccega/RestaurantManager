import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TodayStatistics, EmployeeStatistics } from "../models/Statistics";

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

  constructor(private http: HttpClient) {}

  getTodayStatistics(): Promise<TodayStatistics> {
    return this.http
      .get<TodayStatistics>(`${environment.serverUrl}/statistics/daily`)
      .toPromise();
  }

  getTodayEmployeeStatistics(id): Promise<EmployeeStatistics> {
    return this.http
      .get<EmployeeStatistics>(`${environment.serverUrl}/statistics/user/${id}`)
      .toPromise();
  }
}
