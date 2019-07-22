import { Component, OnInit } from "@angular/core";
import { TableService } from "src/app/services/table.service";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";

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
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("New Table");
  }

<<<<<<< HEAD
  getMenu(): void {
    this.dishService.getMenu().subscribe(menu => {
      this.menu = menu;
      console.log(this.menu);
=======
  async createTable() {
    this.waitingPromise = true;
    const newId = await this.tableService.createTable(this.seats);
    this.router.navigate(["/waiter", "dashboard", newId], {
      queryParams: { result: "success" }
>>>>>>> 08e64b6804851b26a6f6cfa48c2ce2fde2b1fa06
    });
  }

  close(): void {
    this.router.navigate(["/waiter", "dashboard"]);
  }
}
