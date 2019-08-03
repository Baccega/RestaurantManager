import { Injectable } from "@angular/core";
import { Dish, DishStatus } from "../models/Dish";
import { Observable, of } from "rxjs";
import { Course } from "../models/Course";

@Injectable({
  providedIn: "root"
})
export class DishService {
  menu: Course[] = [
    {
      id: "1",
      name: "antipasti",
      dishes: [
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "antipasti",
          name: "baccala ecca la",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "antipasti",
          name: "baccala ecca la",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "antipasti",
          name: "baccala ecca la",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        }
      ]
    },

    {
      id: "2",
      name: "primi",
      dishes: [
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "primi",
          name: "basta",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "primi",
          name: "lisotto",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "primi",
          name: "blodo",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        }
      ]
    },
    {
      id: "2",
      name: "secondi",
      dishes: [
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "secondi",
          name: "pesse",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "secondi",
          name: "bistecca",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "secondi",
          name: "piadina",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        }
      ]
    },
    {
      id: "2",
      name: "bevande",
      dishes: [
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "bevande",
          name: "acqua",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "bevande",
          name: "vino",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          handler: "waiter1",
          category: "bevande",
          name: "aria",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        }
      ]
    }
  ];

  constructor() {}

  getCourses(): Observable<Course[]> {
    return of(this.menu);
  }
}
