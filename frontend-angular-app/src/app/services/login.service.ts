import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
const httpOption = {
  headers: new HttpHeaders({
    "Content-type": "application/json"
  })
};

export class LoginService {
  constructor(private http:HttpClient) {}

  loginUser(user) {
    
  }
}
