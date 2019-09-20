import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { AuthService } from "src/app/services/auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  credential: FormGroup;
  error: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private utilsService: UtilsService,
    private jwt: JwtHelperService
  ) {}

  onSubmit(data: any) {
    this.utilsService.setProgressbar(true);

    this.authService.loginUser(data).subscribe(
      payload => {
        this.utilsService.setProgressbar(false);
        const user = this.jwt.decodeToken(payload.AccessToken);
        sessionStorage.setItem("AccessToken", payload.AccessToken);
        sessionStorage.setItem("RefreshToken", payload.RefreshToken);
        sessionStorage.setItem("UserName", user.name);
        sessionStorage.setItem("UserRole", user.role);
        console.log("ACCESS: ", payload.AccessToken);
        console.log("REFRESH: ", payload.RefreshToken);
        this.authService.setUser(user);
        this.router.navigate([user.role]);
      },
      err => {
        this.utilsService.setProgressbar(false);
        this.error = err.error;
        console.error(err.error);
      }
    );
    this.credential.value["password"] = "";
  }

  ngOnInit() {
    this.utilsService.setTitle("Restaurant App");
    this.authService.logout();
    this.credential = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.credential.controls[controlName].hasError(errorName);
  };
}
