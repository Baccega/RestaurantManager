export enum DishStatus {
  Waiting = 0,
  Started = 1,
  Finished = 2
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  quantity: number;
  preparation: string;
  status: DishStatus;
  category: string;
}
