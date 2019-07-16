import { Injectable } from "@angular/core";
import { Table } from "../models/Table";
import { Observable, throwError, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TableService {
  tables: Table[] = [
    {
      id: "1",
      seats: 2,
      free: false
    },
    {
      id: "2",
      seats: 2,
      free: true
    }
  ];

  getTables(): Observable<Table[]> {
    return of(this.tables);
  }

  getTable(id): Observable<Table> {
    const found: Table = this.tables.find(table => table.id === id);
    if (found) {
      return of(found);
    } else {
      return throwError(`Table "${id}" not found`);
    }
  }

  constructor() {}
}
