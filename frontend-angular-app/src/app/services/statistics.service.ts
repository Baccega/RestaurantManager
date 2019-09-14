import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "selenium-webdriver/http";
import { environment } from "src/environments/environment";

const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("token")
  })
};
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

  getTodayStatistics(): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/daily`, httpOption);
  }

  getTodayEmployeeStatistics(id): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}/user`, id, httpOption);
  }
}
