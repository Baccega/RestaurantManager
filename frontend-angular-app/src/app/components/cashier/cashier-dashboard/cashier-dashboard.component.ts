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
  tableSub: Subscription[] = [];
  tablesSub: Subscription;

  constructor(
    private utilsService: UtilsService,
    private tableService: TableService
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("Dashboard");
    this.tablesSub = this.tableService.watchTables().subscribe(tables => {
      this.tables = tables;
      tables.forEach(
        (table, index) =>
          (this.tableSub[index] = this.tableService
            .watchTable(table.id)
            .subscribe(newTable => {
              tables[index] = newTable;
            }))
      );
    });
  }

  ngOnDestroy() {
    this.tableSub.forEach(sub => sub.unsubscribe());
    this.tablesSub.unsubscribe();
  }

  changeTab(which) {
    this.tab = which;
  }
}
