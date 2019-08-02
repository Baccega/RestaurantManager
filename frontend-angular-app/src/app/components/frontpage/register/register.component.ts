import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { RegisterService } from "src/app/services/register.service";
import { MatSnackBar } from "@angular/material";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { Router } from "@angular/router";

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
    private router: Router
  ) {
    this.newUser = this.formBuilder.group({
      name: "",
      email: "",
      password: "",
      role: ""
    });
  }

  onSubmit(data: any) {
    console.warn("Your order has been submitted", data);

    this.registerService.registerUser(data).subscribe(
      data => {
        console.log(data);
        this.router.navigate(["/", "login"]);
      },
      err => {
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 2000,
          data: err.error
        });
        console.log(err.error);
      }
    );

    this.newUser.reset();
  }

  ngOnInit() {}
}
