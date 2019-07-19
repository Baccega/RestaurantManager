import { Component, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-waiter-table-detail",
  templateUrl: "./waiter-table-detail.component.html",
  styleUrls: ["./waiter-table-detail.component.scss"]
})
export class WaiterTableDetailComponent implements OnInit {
  tableId = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((par: Params) => {
      if (par["id"]) {
        this.tableId = par["id"];
        this.utils.setId(par["id"]);
      }
    });
  }

  goToNewOrder() {
    this.router.navigate(["waiter", "new-order", this.tableId]);
  }
}
