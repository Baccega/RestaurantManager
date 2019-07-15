import { Injectable } from "@angular/core";
import { stringify } from "@angular/compiler/src/util";

@Injectable({
  providedIn: "root"
})
export class DishService {
  constructor() {}

  getMenu() {
    return [];
  }
}
