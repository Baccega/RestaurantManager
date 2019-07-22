import { Table } from "./Table";
import { Dish } from "./Dish";

export enum OrderStatus {
  Waiting = 0,
  Preparing = 1,
  Ready = 2,
  Delivered = 3
}

export interface Order {
  id: String;
  table: Table;
  dishes: Dish[];
  waiter: string;
  status: OrderStatus;
}
