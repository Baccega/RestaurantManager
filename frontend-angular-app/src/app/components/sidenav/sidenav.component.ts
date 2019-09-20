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
  userName: string = "";
  userRole: string = "";
  notUppedRole: string;
  uppedRole: string;
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    const name = sessionStorage.getItem("UserName");
    const role = sessionStorage.getItem("UserRole");
    if (name && name != "") {
      console.log("Already Authenticated");
      this.userName = name;
      this.userRole = role;
      this.uppedRole =
        this.userRole.charAt(0).toUpperCase() + this.userRole.slice(1);
    }
    this.authService.watchUser().subscribe(newUser => {
      if (newUser.role && newUser.role != "nobody") {
        console.log("New user logged");
        this.userName = sessionStorage.getItem("UserName");
        this.userRole = sessionStorage.getItem("UserRole");
        this.uppedRole =
          this.userRole.charAt(0).toUpperCase() + this.userRole.slice(1);
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeSide() {
    this.utilsService.setSidebar(false);
  }
}
