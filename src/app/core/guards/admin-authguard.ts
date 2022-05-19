import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const helper = new JwtHelperService()
    if (JSON.parse(localStorage.getItem("token")!)) {
      let token = JSON.parse(localStorage.getItem("token")!)
      const decodedToken = helper.decodeToken(token.access_token);
      if (decodedToken) {
        if (decodedToken.roles.includes("ADMIN")) {
          return true;
        }
      }
    }
    return false;
  }
}
