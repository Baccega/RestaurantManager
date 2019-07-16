import { Component, OnInit } from "@angular/core";
import { Table } from "src/app/models/Table";
import { TableService } from "src/app/services/table.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-waiter-table-list",
  templateUrl: "./waiter-table-list.component.html",
  styleUrls: ["./waiter-table-list.component.scss"]
})
export class WaiterTableListComponent implements OnInit {
  tables: Table[];

  constructor(private tableService: TableService, private router: Router) {}

  ngOnInit() {
    this.tableService.getTables().subscribe(tables => (this.tables = tables));
  }

  navigateTo(id: string) {
    this.router.navigate(["waiter", id]);
  }
}
