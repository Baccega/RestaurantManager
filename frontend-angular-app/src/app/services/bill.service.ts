import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Order } from "../models/Order";

@Injectable({
  providedIn: "root"
})
export class BillService {
  constructor(private http: HttpClient) {}

  createBill(tableId, total, dishes) {
    const data = { total: total, dishes: dishes };
    return this.http
      .post<any>(`${environment.serverUrl}/bills/${tableId}`, data)
      .toPromise();
  }

  getBill(tableId): Observable<Order[]> {
    tableId = tableId != "" ? `/tables/${tableId}` : "";
    return this.http.get<Order[]>(`${environment.serverUrl}/orders${tableId}`);
  }
}
