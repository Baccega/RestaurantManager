import { Table } from "./Table";
import { Dish } from "./Dish";

export enum FoodStatus {
  Waiting = 0,
  Preparing = 1,
  Ready = 2,
  Delivered = 3
}

export enum DrinkStatus {
  Waiting = 0,
  Ready = 2,
  Delivered = 3
}

export interface Order {
  id: String;
  dishes: Dish[];
  foodStatus: FoodStatus;
  drinkStatus: DrinkStatus;
  table: string; // Table ID
  waiter: string;
}
