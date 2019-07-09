import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-waiter-new-order",
  templateUrl: "./waiter-new-order.component.html",
  styleUrls: ["./waiter-new-order.component.scss"]
})
export class WaiterNewOrderComponent implements OnInit {
  menu = [
    {
      cat: "anti",
      piatti: ["ant1", "ant2", "ant3"]
    },
    {
      cat: "primi",
      piatti: ["prim1", "prim2", "prim3"]
    },
    {
      cat: "secondi",
      piatti: ["second1", "second2", "second3"]
    }
  ];
  table;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.table = params.id;
    });
  }

  ngOnInit() {}
}
