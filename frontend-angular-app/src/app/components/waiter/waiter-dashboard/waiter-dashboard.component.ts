import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-waiter-dashboard",
  templateUrl: "./waiter-dashboard.component.html",
  styleUrls: ["./waiter-dashboard.component.scss"]
})
export class WaiterDashboardComponent implements OnInit, OnDestroy {
  routerQuerySub: Subscription;

  constructor(
    private utilsService: UtilsService,
    private _snackBar: MatSnackBar,
    private activated: ActivatedRoute
  ) {}

  ngOnInit() {
    this.utilsService.setTitle("Dashboard - Waiter");
    this.routerQuerySub = this.activated.queryParams.subscribe(qParams => {
      if (qParams["result"] == "success") {
        this._snackBar.open("Operazione Eseguita!", "Chiudi", {
          duration: 2000
        });
      }
    });
  }
  ngOnDestroy() {
    this.routerQuerySub.unsubscribe();
  }
}
