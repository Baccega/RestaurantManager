import { Injectable } from "@angular/core";
import { Dish } from '../models/Dish';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: "root"
})


export class DishService {

  ordersDish:Dish[][]=[];

  constructor() {}

  getMenu():Observable<Dish[]> {
    return of([
      {
        id:"0",
        category: "antipasti",
        name: "baccala ecca la",
        price: 33,
        quantity: 0,
        done: false
      },
      
      {
        id:"1",
        category: "primi",
        name: "pasta con TONNOH",
        price: 33,
        quantity: 0,
        done: false
      },
      
      {
        id:"2",
        category: "secondi",
        name: "pizza margherita",
        price: 33,
        quantity: 0,
        done: false
      },
      
      {
        id:"3",
        category: "dolci",
        name: "panna e cioccolato",
        price: 33,
        quantity: 0,
        done: false
      },
      
      {
        id:"4",
        category: "bevande",
        name: "juicy fruit mix",
        price: 33,
        quantity: 0,
        done: false
      }
      
    ]);
  }

  sendOrder(order:Dish[]){
    this.ordersDish.push(order);
  }
}
