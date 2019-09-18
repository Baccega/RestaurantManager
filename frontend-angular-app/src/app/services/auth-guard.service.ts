import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private jwt: JwtHelperService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    // decode the token to get its payload
    const role = this.jwt.decodeToken(sessionStorage.getItem("AccessToken"))
      .role;
    if (!this.auth.isAuthenticated() || role != expectedRole) {
      this.router.navigate(["/user"]);
      return false;
    }
    return true;
  }
}
