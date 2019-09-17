import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UtilsService } from "src/app/services/utils.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.authService.setUser({
      role: "nobody",
      userId: "0",
      name: "",
      dailyPlate: 0,
      totalPlate: 0
    });
    sessionStorage.clear();
    this.router.navigate(["login"]);
  }
}
