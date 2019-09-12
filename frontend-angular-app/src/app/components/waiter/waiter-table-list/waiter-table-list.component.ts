import { Component, OnInit, OnDestroy } from "@angular/core";
import { Table } from "src/app/models/Table";
import { TableService } from "src/app/services/table.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-waiter-table-list",
  templateUrl: "./waiter-table-list.component.html",
  styleUrls: ["./waiter-table-list.component.scss"]
})
export class WaiterTableListComponent implements OnInit, OnDestroy {
  tables: Table[];
  id: String;
  tableSub: Subscription;
  utilsSub: Subscription;

  constructor(
    private tableService: TableService,
    private router: Router,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.tableSub = this.tableService
      .watchFreeTables()
      .subscribe(tables => (this.tables = tables));

    this.utilsSub = this.utils.watchId().subscribe(newId => {
      this.id = newId;
    });
  }

  ngOnDestroy() {
    this.tableSub.unsubscribe();
    this.utilsSub.unsubscribe();
  }

  navigateTo(id: string) {
    this.router.navigate(["/", "waiter", "dashboard", id]);
  }
}
