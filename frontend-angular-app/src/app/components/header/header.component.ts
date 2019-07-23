import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  title: String;
  progressbar: boolean;
  titleSub: Subscription;
  progressSub: Subscription;

  constructor(private utilsService: UtilsService) {}

  ngOnInit() {
    this.titleSub = this.utilsService
      .watchTitle()
      .subscribe(title => (this.title = title));
    this.progressSub = this.utilsService
      .watchProgressbar()
      .subscribe(progressbar => (this.progressbar = progressbar));
  }

  ngOnDestroy() {
    this.titleSub.unsubscribe();
    this.progressSub.unsubscribe();
  }

  openSidenav() {
    this.utilsService.setSidebar(true);
  }
}
