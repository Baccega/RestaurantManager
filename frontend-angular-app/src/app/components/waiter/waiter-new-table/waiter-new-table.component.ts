import { Component, OnInit } from "@angular/core";
import { TableService } from "src/app/services/table.service";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { Table } from "src/app/models/Table";
import { SocketService } from "src/app/services/socket.service";
import { Bill } from "src/app/models/Bill";

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
    private utilsService: UtilsService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("New Table");
    this.tableService.getFreeTables().subscribe(newTables => {
      this.tables = newTables;
      this.visibleTables = this.tables.filter(
        table => table.seats > this.seats
      );
    });

    this.socketService.initSocket();
    this.socketService.listen<Table>("new-table").subscribe(newTable => {
      const index = this.tables.findIndex(
        table => newTable.number == table.number
      );
      this.tables[index] = newTable;
      this.visibleTables = this.tables.filter(
        table => table.free && table.seats > this.seats
      );
    });

    this.socketService.initSocket();
    this.socketService.listen<Table>("new-bill").subscribe(newTable => {
      this.tables.push(newTable);
      this.visibleTables = this.tables.filter(
        table => table.free && table.seats > this.seats
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
    this.router.navigate(["/waiter", this.selected], {
      queryParams: { result: "success" }
    });
  }

  close(): void {
    this.router.navigate(["/waiter"]);
  }

  removeSeat() {
    if (this.seats > 1) {
      this.seats--;
      this.visibleTables = this.tables.filter(
        table => table.free && table.seats > this.seats
      );
    }
  }

  addSeat() {
    this.seats++;
    this.visibleTables = this.tables.filter(
      table => table.free && table.seats > this.seats
    );
  }

  select(id) {
    this.selected = id != this.selected ? id : -1;
  }
}
