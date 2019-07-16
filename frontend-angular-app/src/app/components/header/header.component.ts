import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { SidenavService } from "src/app/services/sidenav.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: string;
  activeSub: Subscription;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    // console.log();
  }

  ngOnDestroy() {
    this.activeSub.unsubscribe();
  }

  openSidenav() {
    console.log("pressed");
    this.sidenavService.setStatus(true);
  }
}
