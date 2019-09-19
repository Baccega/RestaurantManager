import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { StatisticsService } from "src/app/services/statistics.service";
import { EmployeeStatistics } from "src/app/models/Statistics";

@Component({
  selector: "app-cashier-statistics-user",
  templateUrl: "./cashier-statistics-user.component.html",
  styleUrls: ["./cashier-statistics-user.component.scss"]
})
export class CashierStatisticsUserComponent implements OnInit {
  userId;
  user = {
    name: "",
    role: ""
  };
  stat: EmployeeStatistics = {
    preparedDishes: 0,
    customersServed: 0
  };

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
      this.utilsService.setTitle("Employees Management");
      this.utilsService.setProgressbar(true);
      this.user = await this.userService.getUser(this.userId);
      this.stat = await this.statisticService.getTodayEmployeeStatistics(
        this.userId
      );
      this.utilsService.setProgressbar(false);
    });
  }

  navigateToStatistics() {
    this.router.navigate(["../../"], { relativeTo: this.activatedRoute });
  }

  async deleteUser() {
    try {
      this.utilsService.setProgressbar(true);
      const result = await this.userService.deleteUser(this.userId);
      console.log(result);
      this.utilsService.setProgressbar(false);
      this.router.navigate(["../../"], { relativeTo: this.activatedRoute });
    } catch (e) {
      console.log(e);
    }
  }
}
