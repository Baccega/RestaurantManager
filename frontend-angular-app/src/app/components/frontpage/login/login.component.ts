import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup
} from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
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
  credential: FormGroup;
  error: string = "";

  constructor(
    private loginService: LoginService,
    private router: Router,
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
