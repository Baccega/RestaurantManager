import { Injectable } from "@angular/core";
import { Table } from "../models/Table";
import { Observable, throwError, of } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  constructor(private http:HttpClient){}

  tables: Table[] = [
    {
      id: "1",
      seats: 1,
      free: false
    },
    {
      id: "2",
      seats: 2,
      free: false
    },
    {
      id: "3",
      seats: 3,
      free: true
    },
    {
      id: "4",
      seats: 4,
      free: true
    },
    {
      id: "5",
      seats: 5,
      free: true
    },
    {
      id: "6",
      seats: 6,
      free: true
    },
    {
      id: "2",
      seats: 7,
      free: true
    }
  ];

  watchTables(): Observable<Table[]> {
    return this.http.get<any>(`${environment.serverUrl}/tables/myTables`, httpOption);
  }

  getFreeTables(): Observable<Table[]> {
    return this.http.get<any>(`${environment.serverUrl}/tables/freeTables`, httpOption);
  }

  watchTable(id): Observable<Table> {
    const found: Table = this.tables.find(table => table.id === id);
    if (found) {
      return of(found);
    } else {
      return throwError(`Table "${id}" not found`);
    }
  }

  createTable(data): Promise<any>{
    console.log(data);
    return this.http.post<any>(`${environment.serverUrl}/bills/`,data, httpOption).toPromise();
  }
}
