import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Promise<User[]> {
    return this.http.get<User[]>(`${environment.serverUrl}/users`).toPromise();
  }

  getUser(id): Promise<User> {
    return this.http
      .get<User>(`${environment.serverUrl}/users/${id}`)
      .toPromise();
  }

  deleteUser(id) {
    return this.http
      .delete<string>(`${environment.serverUrl}/users/${id}`)
      .toPromise();
  }
}
