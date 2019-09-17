import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/User";
import { Subscription } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit, OnDestroy {
  user: User = {
    userId: "",
    name: "",
    role: "",
    dailyPlate: 0,
    totalPlate: 0
  };
  notUppedRole: string;
  uppedRole: string;
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.sub = this.authService.watchUser().subscribe(userLogged => {
      console.log("New user logged");
      this.user = userLogged;
      this.uppedRole =
        userLogged.role.charAt(0).toUpperCase() + userLogged.role.slice(1);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeSide() {
    this.utilsService.setSidebar(false);
  }
}
