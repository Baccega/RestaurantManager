import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { User } from "../models/User";

const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "auth-token": "text"
  })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public userWatcher: Subject<User> = new Subject();

  constructor(private http: HttpClient) {}

  registerUser(data): Promise<any> {
    return this.http
      .post<any>(`${environment.serverUrl}/users/register`, data, httpOption)
      .toPromise();
  }

  loginUser(user): Observable<any> {
    return this.http.post<any>(
      `${environment.serverUrl}/users/login`,
      user,
      httpOption
    );
  }

  logout(): Promise<void> {
    return new Promise<void>(resolve => {
      this.userWatcher.complete();
      this.userWatcher = new Subject();
      sessionStorage.clear();
      resolve();
    });
  }

  setUser(user) {
    this.userWatcher.next(user);
  }

  watchUser(): Observable<User> {
    return this.userWatcher;
  }
}
