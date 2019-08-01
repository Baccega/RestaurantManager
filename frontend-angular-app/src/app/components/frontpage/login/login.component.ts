import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { User } from "../../../models/User";
import { Router } from "@angular/router";

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
    private router: Router
  ) {
    this.credential = this.formBuilder.group({
      email: "",
      password: ""
    });
  }

  onSubmit(data: any) {
    let aaa: User = data;

    console.warn("Your order has been submitted", aaa);

    //send data to service
    this.loginService.loginUser(data).subscribe(
      data => {
        console.log(data);
        localStorage.setItem("token", data.token);
        this.router.navigate([data.role]);
      },
      err => {
        console.log(err.error);
      }
    );

    this.credential.reset();
  }

  ngOnInit() {}
}
