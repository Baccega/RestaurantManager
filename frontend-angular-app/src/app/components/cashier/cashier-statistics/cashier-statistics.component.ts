import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { StatisticsService } from "src/app/services/statistics.service";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/User";
import { TodayStatistics } from "src/app/models/Statistics";

@Component({
  selector: "app-cashier-statistics",
  templateUrl: "./cashier-statistics.component.html",
  styleUrls: ["./cashier-statistics.component.scss"]
})
export class CashierStatisticsComponent implements OnInit {
  profit = 0;
  customersServed = 0;
  users: User[];

  constructor(
    private utilsService: UtilsService,
    private statisticsService: StatisticsService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.utilsService.setTitle("Statistics & Management");

    const statistics: TodayStatistics = await this.statisticsService.getTodayStatistics();
    this.profit = statistics[0].statistic;
    this.customersServed = statistics[1].statistic;

    this.utilsService.setProgressbar(true);

    this.users = await this.userService.getUsers();

    this.utilsService.setProgressbar(false);
  }
  closeDay() {
    this.profit = 0;
    this.customersServed = 0;
    this.statisticsService.closeDay();
  }
}
