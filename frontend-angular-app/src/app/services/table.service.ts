import { Injectable } from "@angular/core";
import { Table } from "../models/Table";
import { Observable, throwError, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class TableService {
  constructor(private http: HttpClient) {}

  watchTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${environment.serverUrl}/tables`);
  }

  watchMyTables(): Observable<Table[]> {
    return this.http.get<any>(`${environment.serverUrl}/tables/myTables`);
  }

  getFreeTables(): Observable<Table[]> {
    return this.http.get<any>(`${environment.serverUrl}/tables/freeTables`);
  }

  watchTable(id): Observable<Table> {
    return this.http.get<any>(`${environment.serverUrl}/tables/${id}`);
  }

  createTable(data): Promise<any> {
    return this.http
      .post<any>(`${environment.serverUrl}/bills/`, data)
      .toPromise();
  }
}
