import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-waiter-table-detail",
  templateUrl: "./waiter-table-detail.component.html",
  styleUrls: ["./waiter-table-detail.component.scss"]
})
export class WaiterTableDetailComponent implements OnInit {
  id;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((par: Params) => {
      this.id = par["id"] ? par["id"] : "";
      console.log("OK " + this.id);
    });
  }
}
