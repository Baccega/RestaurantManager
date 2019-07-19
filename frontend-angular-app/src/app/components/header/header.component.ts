import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { SidenavService } from "src/app/services/sidenav.service";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: String;
  activeSub: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.utilsService.watchTitle().subscribe(title => (this.title = title));
  }

  ngOnDestroy() {
    this.activeSub.unsubscribe();
  }

  openSidenav() {
    this.sidenavService.setStatus(true);
  }
}
