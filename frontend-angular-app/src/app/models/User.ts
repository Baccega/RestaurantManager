export enum Role {
  Waiter = 0,
  Chef = 2,
  Bartender = 3,
  Cashier = 4
}

export interface User {
  id: string;
  name: string;
  role: Role;
}
