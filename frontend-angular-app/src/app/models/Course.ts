import { Dish } from "./Dish";

export interface Course {
  id: string;
  name: string;
  dishes: Dish[];
}
