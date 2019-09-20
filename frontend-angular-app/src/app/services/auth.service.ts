import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { User } from "../models/User";
import { UtilsService } from "./utils.service";
import { JwtHelperService } from "@auth0/angular-jwt";

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

  constructor(
    private http: HttpClient,
    private utils: UtilsService,
    private jwtHelper: JwtHelperService
  ) {}

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

  logout() {
    this.setUser({
      role: "nobody",
      userId: "0",
      name: "",
      dailyPlate: 0,
      totalPlate: 0
    });
    sessionStorage.clear();
    this.utils.setId("");
  }

  setUser(user) {
    this.userWatcher.next(user);
  }

  watchUser(): Observable<User> {
    return this.userWatcher;
  }

  isAuthenticated(): boolean {
    const saved_AccessToken = sessionStorage.getItem("AccessToken");
    const saved_RefreshToken = sessionStorage.getItem("RefreshToken");
    return (
      saved_AccessToken &&
      saved_RefreshToken &&
      (!this.jwtHelper.isTokenExpired(saved_AccessToken) ||
        !this.jwtHelper.isTokenExpired(saved_RefreshToken))
    );
  }

  refreshToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const saved_AccessToken = sessionStorage.getItem("AccessToken");
      const saved_RefreshToken = sessionStorage.getItem("RefreshToken");
      if (saved_AccessToken && saved_RefreshToken) {
        if (!this.jwtHelper.isTokenExpired(saved_AccessToken)) {
          resolve("AccessToken doesn't expire");
        } else {
          let body = {
            AccessToken: saved_AccessToken,
            RefreshToken: saved_RefreshToken
          };
          this.http
            .post<any>(environment.serverUrl + "/users/refresh-token", body)
            .subscribe(
              res => {
                sessionStorage.setItem("AccessToken", res.AccessToken);
                resolve("Created new AccessToken");
              },
              err => {
                reject(err.error);
              }
            );
        }
      } else {
        reject("AccessToken or RefreshToken didn't save");
      }
    });
  }
}
