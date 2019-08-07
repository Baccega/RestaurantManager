import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-bartender-dashboard",
  templateUrl: "./bartender-dashboard.component.html",
  styleUrls: ["./bartender-dashboard.component.scss"]
})
export class BartenderDashboardComponent implements OnInit {
  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.utilsService.setTitle("Dashboard");
  }
}
