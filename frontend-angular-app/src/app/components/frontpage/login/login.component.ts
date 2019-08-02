import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { User } from "../../../models/User";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  credential;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private utilsService: UtilsService
  ) {}

  onSubmit(data: any) {
    this.utilsService.setProgressbar(true);

    this.loginService.loginUser(data).subscribe(
      data => {
        this.utilsService.setProgressbar(false);
        console.log(data);
        localStorage.setItem("token", data.token);
        this.router.navigate([data.role]);
      },
      err => {
        this.utilsService.setProgressbar(false);
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 1500,
          data: err.error
        });
        console.log(err.error);
      }
    );

    this.credential.reset();
  }

  ngOnInit() {
    this.credential = this.formBuilder.group({
      email: "",
      password: ""
    });
  }
}
