export interface Bill {
  total: number;
  date: Date;
  dishes: Object[]; // Order ID []
  table: string; // Table ID
  waiter: string; // Employee ID
}
