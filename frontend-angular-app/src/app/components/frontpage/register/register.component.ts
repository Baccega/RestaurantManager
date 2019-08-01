import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { RegisterService } from "src/app/services/register.service";

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
    { name: "cassher" }
  ];

  newUser;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {
    this.newUser = this.formBuilder.group({
      username: "",
      password: "",
      role:""
    });
  }

  onSubmit(data:any){
    console.warn('Your order has been submitted', data);

    //send data to service
    
    this.newUser.reset();
  }

  ngOnInit() {}
}
