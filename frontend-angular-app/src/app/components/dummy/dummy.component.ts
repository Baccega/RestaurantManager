import { Component, OnInit } from "@angular/core";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-dummy",
  templateUrl: "./dummy.component.html",
  styleUrls: ["./dummy.component.scss"]
})
export class DummyComponent implements OnInit {
  constructor(private utils: UtilsService) {}

  ngOnInit() {
    this.utils.setId("");
  }
}
