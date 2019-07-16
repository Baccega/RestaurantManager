import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string;
  activeSub: Subscription;

  constructor() {}

  ngOnInit() {
    console.log();
  }

  ngOnDestroy() {
    this.activeSub.unsubscribe();
  }
}
