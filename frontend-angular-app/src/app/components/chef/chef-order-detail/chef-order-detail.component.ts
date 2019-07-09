import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-chef-order-detail",
  templateUrl: "./chef-order-detail.component.html",
  styleUrls: ["./chef-order-detail.component.scss"]
})
export class ChefOrderDetailComponent implements OnInit {
  @Input() order;
  constructor() {}

  ngOnInit() {}
}
