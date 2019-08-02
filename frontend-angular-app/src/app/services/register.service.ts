import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "auth-token": "text"
  })
};

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerUser(data): Observable<any> {
    return this.http.post<any>(
      "http://localhost:3000/users/register",
      data,
      httpOption
    );
  }
}
