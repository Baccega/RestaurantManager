import { Component, OnInit, OnDestroy } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-chef-dashboard",
  templateUrl: "./chef-dashboard.component.html",
  styleUrls: ["./chef-dashboard.component.scss"]
})
export class ChefDashboardComponent implements OnInit {
  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.utils.setTitle("Dashboard - Chef");
  }
}
