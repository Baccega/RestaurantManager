import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-waiter-table-detail",
  templateUrl: "./waiter-table-detail.component.html",
  styleUrls: ["./waiter-table-detail.component.scss"]
})
export class WaiterTableDetailComponent implements OnInit {
  tableId;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((par: Params) => {
      this.tableId = par["id"] ? par["id"] : "";
    });
  }

  goToNewOrder() {
    this.router.navigate(["waiter", "new-order", this.tableId]);
  }
}
