import { Injectable } from "@angular/core";
import { User, Role } from "../models/User";

@Injectable({
  providedIn: "root"
})
export class UserService {
  users: User[] = [
    {
      id: "5",
      name: "Scode",
      role: 0
    },
    {
      id: "1",
      name: "Scode2",
      role: 1
    }
  ];

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }
}
