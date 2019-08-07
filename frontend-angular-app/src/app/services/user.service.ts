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
      role: 0,
      dailyPlate: 1,
      totalPlate: 20
    },
    {
      id: "1",
      name: "Scode2",
      role: 1,
      dailyPlate: 2,
      totalPlate: 30
    }
  ];

  constructor() {}

  getUsers(): User[] {
    return this.users;
  }

  getUser(id): User {
    let found = this.users.find(user => user.id === id);
    return found;
  }

  deleteUser(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
}
