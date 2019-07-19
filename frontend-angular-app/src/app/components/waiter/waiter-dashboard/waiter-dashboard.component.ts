import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HeaderTitleService } from "src/app/services/header-title.service";
import { MatSnackBar } from "@angular/material";
import { Subscription } from "rxjs";

@Component({
  selector: "app-waiter-dashboard",
  templateUrl: "./waiter-dashboard.component.html",
  styleUrls: ["./waiter-dashboard.component.scss"]
})
export class WaiterDashboardComponent implements OnInit, OnDestroy {
  routerSub: Subscription;

  constructor(
    private headerService: HeaderTitleService,
    private _snackBar: MatSnackBar,
    private activated: ActivatedRoute
  ) {}

  ngOnInit() {
    this.headerService.setTitle("Dashboard");
    this.routerSub = this.activated.queryParams.subscribe(qParams => {
      if (qParams["result"] == "success") {
        this._snackBar.open("Operazione Eseguita!", "Chiudi", {
          duration: 2000
        });
      }
    });
  }
  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
