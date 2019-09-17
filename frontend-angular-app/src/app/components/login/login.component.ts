import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { AuthService } from "src/app/services/auth.service";

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
    private utilsService: UtilsService
  ) {}

  onSubmit(data: any) {
    this.utilsService.setProgressbar(true);

    this.authService.loginUser(data).subscribe(
      payload => {
        this.utilsService.setProgressbar(false);
        console.log(payload.token);
        sessionStorage.setItem("token", payload.token);
        this.authService.setUser(payload.user);
        this.router.navigate([payload.user.role]);
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
