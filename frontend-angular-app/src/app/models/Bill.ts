export interface Bill {
  total: number;
  date: Date;
  orders: string[]; // Order ID []
  table: string; // Table ID
  waiter: string; // Employee ID
}
