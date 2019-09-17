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
  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.utilsService.setProgressbar(true);
    await this.authService.logout();
    await this.utilsService.setProgressbar(false);
    this.router.navigate(["login"]);
  }
}
