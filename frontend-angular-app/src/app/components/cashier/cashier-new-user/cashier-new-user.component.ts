import { Component, OnInit } from "@angular/core";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { UtilsService } from "src/app/services/utils.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-cashier-new-user",
  templateUrl: "./cashier-new-user.component.html",
  styleUrls: ["./cashier-new-user.component.scss"]
})
export class CashierNewUserComponent implements OnInit {
  roles = ["waiter", "bartender", "chef", "cashier"];

  newUser: FormGroup;

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService
  ) {}

  async onSubmit(data: any) {
    try {
      console.log(data);
      this.utilsService.setProgressbar(true);
      const response = await this.authService.registerUser(data);
      this.utilsService.setProgressbar(false);
      console.log(response);
      this.router.navigate(["/", "login"]);
    } catch (err) {
      this.utilsService.setProgressbar(false);
      this._snackBar.openFromComponent(SnackbarComponent, {
        duration: 1500,
        data: "Errore"
      });
      console.error(err.error);
    }

    this.newUser.reset();
  }

  ngOnInit() {
    this.utilsService.setTitle("Sign up a new employee");
    this.newUser = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      role: new FormControl("", [Validators.required])
    });
  }

  navigateToStatistics() {
    this.router.navigate(["../../"], { relativeTo: this.activatedRoute });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.newUser.controls[controlName].hasError(errorName);
  };
}
