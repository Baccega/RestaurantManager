import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { RegisterService } from "src/app/services/register.service";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { Router } from "@angular/router";
import { UtilsService } from "src/app/services/utils.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  roles: Object[] = [
    { name: "waiter" },
    { name: "bartender" },
    { name: "chef" },
    { name: "cashier" }
  ];

  newUser;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  onSubmit(data: any) {
    this.utilsService.setProgressbar(true);
    this.registerService.registerUser(data).subscribe(
      data => {
        this.utilsService.setProgressbar(false);
        console.log(data);
        this.router.navigate(["/", "login"]);
      },
      err => {
        this.utilsService.setProgressbar(false);
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 1500,
          data: "Errore"
        });
        console.error(err.error);
      }
    );

    this.newUser.reset();
  }

  ngOnInit() {
    this.newUser = this.formBuilder.group({
      name: "",
      email: "",
      password: "",
      role: ""
    });
    this.utilsService.setTitle("Sign up a new user");
  }
}
