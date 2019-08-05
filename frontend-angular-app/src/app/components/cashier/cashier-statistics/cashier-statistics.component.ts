import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { StatisticsService } from "src/app/services/statistics.service";
import { Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/User";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cashier-statistics",
  templateUrl: "./cashier-statistics.component.html",
  styleUrls: ["./cashier-statistics.component.scss"]
})
export class CashierStatisticsComponent implements OnInit {
  profit = 0;
  customersServed = 0;
  users: User[];
  roles = ["Waiter", "Chef", "Bartender", "Cashier"];

  constructor(
    private utilsService: UtilsService,
    private statisticsService: StatisticsService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("Statistics");

    const {
      profit,
      customersServed
    } = this.statisticsService.getTodayStatistics();

    this.profit = profit;
    this.customersServed = customersServed;

    this.users = this.userService.getUsers();
  }

  navigateToUser(user: User) {
    this.router.navigate(["./" + user.id], { relativeTo: this.activatedRoute });
  }
}
