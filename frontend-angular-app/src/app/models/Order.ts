import { Table } from "./Table";
import { Dish } from "./Dish";

export interface Order {
  id:String;
  table: Table;
  dishes: Dish[];
  waiter: string;
}
