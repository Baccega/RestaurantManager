import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";
import { AuthService } from "src/app/services/auth.service";
import { NotificationService } from "src/app/services/notification.service";

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
    private notficationService: NotificationService
  ) {}

  onSubmit(data: any) {
    this.utilsService.setProgressbar(true);

    this.authService.loginUser(data).subscribe(
      payload => {
        this.utilsService.setProgressbar(false);
        localStorage.setItem("token", payload.token);
        this.authService.setUser(payload.user);
        if (payload.user.role == "waiter") {
          this.notficationService.setWaiterId(payload.user._id);
        }
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
