import { Injectable } from "@angular/core";
import { Dish, DishStatus } from "../models/Dish";
import { Observable, of } from "rxjs";
import { Course } from "../models/Course";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "auth-token": localStorage.getItem("token")
  })
};

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
          category: "antipasti",
          name: "baccala ecca la",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          category: "antipasti",
          name: "baccala ecca la",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
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
          category: "primi",
          name: "basta",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          category: "primi",
          name: "lisotto",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
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
          category: "secondi",
          name: "pesse",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          category: "secondi",
          name: "bistecca",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
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
          category: "bevande",
          name: "acqua",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          category: "bevande",
          name: "vino",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        },
        {
          id: "0",
          preparation: "10",
          category: "bevande",
          name: "aria",
          price: 33,
          quantity: 0,
          status: DishStatus["Waiting"]
        }
      ]
    }
  ];

  constructor(private http:HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.serverUrl}/courses/`, httpOption);
  }
}
