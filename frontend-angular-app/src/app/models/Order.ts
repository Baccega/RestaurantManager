import { Table } from "./Table";
import { Dish } from "./Dish";

export interface Order {
  id: string;
  table: Table;
  dishes: Dish[];
  waiter: string;
}
