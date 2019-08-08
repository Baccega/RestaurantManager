import { Component, OnInit, OnDestroy } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";
import { TableService } from "src/app/services/table.service";
import { Subscription } from "rxjs";
import { Table } from "src/app/models/Table";

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
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("Dashboard - Cashier");
    this.tablesSub = this.tableService.watchTables().subscribe(tables => {
      this.tables = tables;
    });
  }

  ngOnDestroy() {
    this.tablesSub.unsubscribe();
  }

  changeTab(which) {
    this.tab = which;
  }
}
