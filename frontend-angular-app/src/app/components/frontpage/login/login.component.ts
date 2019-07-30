import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  credential;
  constructor(private formBuilder: FormBuilder) {
    this.credential = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  onSubmit(data){
    console.warn('Your order has been submitted', data);

    //send data to service

    this.credential.reset();
  }

  ngOnInit() {}
}
