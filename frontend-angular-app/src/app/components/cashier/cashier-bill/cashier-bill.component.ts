import { Component, OnInit, OnDestroy } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BillService } from "src/app/services/bill.service";
import { Subscription } from "rxjs";
import { DishService } from "src/app/services/dish.service";
import { Course } from "src/app/models/Course";

@Component({
  selector: "app-cashier-bill",
  templateUrl: "./cashier-bill.component.html",
  styleUrls: ["./cashier-bill.component.scss"]
})
export class CashierBillComponent implements OnInit, OnDestroy {
  tableId;
  courses: Course[];
  total: number;
  idSub: Subscription;
  orderSub: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService,
    private billService: BillService
  ) {}

  ngOnInit() {
    this.idSub = this.utilService.watchId().subscribe(newId => {
      this.tableId = newId;
      this.utilService.setTitle(`Table ${this.tableId} - Bill`);
    });
    this.orderSub = this.billService
      .getBill(this.tableId)
      .subscribe(newCourses => {
        this.courses = newCourses;
        this.total = this.calcTotal(newCourses);
      });
  }
  ngOnDestroy() {
    this.idSub.unsubscribe();
    this.orderSub.unsubscribe();
  }

  private calcTotal(courses: Course[]): number {
    let tot = 0;
    courses.forEach(course => {
      course.dishes.forEach(dish => {
        tot += dish.price * dish.quantity;
      });
    });
    return tot;
  }

  navigateToOrder() {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }

  async createBill() {
    this.utilService.setProgressbar(true);
    await this.billService.createBill(this.tableId);
    this.utilService.setProgressbar(false);
    this.router.navigate(["cashier", "dashboard"]);
  }
}
