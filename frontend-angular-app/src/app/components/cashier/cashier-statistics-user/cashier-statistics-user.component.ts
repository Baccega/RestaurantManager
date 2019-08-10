import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "src/app/models/User";
import { UserService } from "src/app/services/user.service";
import { StatisticsService } from "src/app/services/statistics.service";

@Component({
  selector: "app-cashier-statistics-user",
  templateUrl: "./cashier-statistics-user.component.html",
  styleUrls: ["./cashier-statistics-user.component.scss"]
})
export class CashierStatisticsUserComponent implements OnInit {
  userId;
  user: User;
  // preparedDishes;
  // customersServed;
  stat;
  roles = ["Waiter", "Chef", "Bartender", "Cashier"];

  constructor(
    private utilsService: UtilsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private statisticService: StatisticsService
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async newUserId => {
      this.userId = newUserId["user"];
      this.utilsService.setProgressbar(true);
      this.user = await this.userService.getUser(this.userId);
      this.utilsService.setProgressbar(false);
      this.utilsService.setTitle("Employees Management");
      this.stat = this.statisticService.getTodayEmployeeStatistics(this.userId);
    });
  }

  navigateToStatistics() {
    this.router.navigate(["../../"], { relativeTo: this.activatedRoute });
  }

  async deleteUser() {
    this.utilsService.setProgressbar(true);
    await this.userService.deleteUser(this.userId);
    this.utilsService.setProgressbar(false);
    this.router.navigate(["../../"], { relativeTo: this.activatedRoute });
  }
}
