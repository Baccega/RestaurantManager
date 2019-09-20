import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TodayStatistics, EmployeeStatistics } from "../models/Statistics";

@Injectable({
  providedIn: "root"
})
export class StatisticsService {
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

  closeDay(): Promise<void> {
    return this.http
      .post<void>(`${environment.serverUrl}/statistics/endDay`, {})
      .toPromise();
  }
}
