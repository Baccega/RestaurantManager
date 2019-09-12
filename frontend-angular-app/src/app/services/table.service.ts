import { Injectable } from "@angular/core";
import { Table } from "../models/Table";
import { Observable, throwError, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
export class TableService {
  constructor(private http: HttpClient) {}

  watchTables(): Observable<Table[]> {
    return this.http.get<any>(`${environment.serverUrl}/tables`, httpOption);
  }

  watchFreeTables(): Observable<Table[]> {
    return this.http.get<any>(
      `${environment.serverUrl}/tables/myTables`,
      httpOption
    );
  }

  getFreeTables(): Observable<Table[]> {
    return this.http.get<any>(
      `${environment.serverUrl}/tables/freeTables`,
      httpOption
    );
  }

  watchTable(id): Observable<Table> {
    return this.http.get<any>(
      `${environment.serverUrl}/tables/${id}`,
      httpOption
    );
  }

  createTable(data): Promise<any> {
    console.log(data);
    return this.http
      .post<any>(`${environment.serverUrl}/bills/`, data, httpOption)
      .toPromise();
  }
}
