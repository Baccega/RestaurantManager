import { Component, OnInit } from "@angular/core";
import { TableService } from "src/app/services/table.service";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { Table } from "src/app/models/Table";

@Component({
  selector: "app-waiter-new-table",
  templateUrl: "./waiter-new-table.component.html",
  styleUrls: ["./waiter-new-table.component.scss"]
})
export class WaiterNewTableComponent implements OnInit {
  selected: number = -1;
  seats: number = 4;
  tables: Table[];
  visibleTables: Table[];

  constructor(
    private tableService: TableService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("New Table");
    this.tableService.getFreeTables().subscribe(newTables => {
      console.log(newTables);
      this.tables = newTables;
      this.visibleTables = this.tables.filter(
        table => table.seats > this.seats
      );
    });
  }

  async createTable() {
    this.utilsService.setProgressbar(true);
    const newId = await this.tableService.createTable({
      customer: this.seats,
      table: this.selected
    });
    this.utilsService.setProgressbar(false);
    this.router.navigate(["/waiter", "dashboard", newId], {
      queryParams: { result: "success" }
    });
  }

  close(): void {
    this.router.navigate(["/waiter", "dashboard"]);
  }

  removeSeat() {
    if (this.seats > 1) {
      this.seats--;
      this.visibleTables = this.tables.filter(
        table => table.seats > this.seats
      );
    }
  }

  addSeat() {
    this.seats++;
    this.visibleTables = this.tables.filter(table => table.seats > this.seats);
  }

  select(id) {
    this.selected = id != this.selected ? id : -1;
  }
}
