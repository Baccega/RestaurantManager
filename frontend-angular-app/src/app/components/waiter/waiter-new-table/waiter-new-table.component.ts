import { Component, OnInit } from "@angular/core";
import { TableService } from "src/app/services/table.service";
import { Router } from "@angular/router";
import { HeaderTitleService } from "src/app/services/header-title.service";

@Component({
  selector: "app-waiter-new-table",
  templateUrl: "./waiter-new-table.component.html",
  styleUrls: ["./waiter-new-table.component.scss"]
})
export class WaiterNewTableComponent implements OnInit {
  waitingPromise: boolean = false;
  seats: Number = 0;

  constructor(
    private tableService: TableService,
    private router: Router,
    private headerService: HeaderTitleService
  ) {}

  ngOnInit() {
    this.headerService.setTitle("New Table");
  }

  async createTable() {
    this.waitingPromise = true;
    const newId = await this.tableService.createTable(this.seats);
    this.router.navigate(["/waiter", "dashboard", newId], {
      queryParams: { result: "success" }
    });
  }

  close(): void {
    this.router.navigate(["/waiter", "dashboard"]);
  }
}
