import { Component, OnInit, OnDestroy } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { TableService } from "src/app/services/table.service";
import { Subscription } from "rxjs";
import { Table } from "src/app/models/Table";
import { SocketService } from "src/app/services/socket.service";

@Component({
  selector: "app-cashier-dashboard",
  templateUrl: "./cashier-dashboard.component.html",
  styleUrls: ["./cashier-dashboard.component.scss"]
})
export class CashierDashboardComponent implements OnInit, OnDestroy {
  tab: string = "busy";
  tables: Table[] = [];
  tablesSub: Subscription;

  constructor(
    private utilsService: UtilsService,
    private tableService: TableService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("Dashboard - Cashier");
    this.tablesSub = this.tableService.watchTables().subscribe(tables => {
      this.tables = tables;
    });

    this.socketService.initSocket();
    this.socketService.listen<Table>("new-table").subscribe(newTable => {
      const index = this.tables.findIndex(
        table => newTable.number == table.number
      );
      this.tables[index] = newTable;
    });
  }

  ngOnDestroy() {
    this.tablesSub.unsubscribe();
  }

  changeTab(which) {
    this.tab = which;
  }
}
