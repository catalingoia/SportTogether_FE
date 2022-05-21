import { Injectable } from '@angular/core';
import {UserLoginModel, UserRegisterModel, UserRole} from "../shared/models/user.model";
import {Observable} from "rxjs";
import {ApiUrls} from "../core/constants/api-urls";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
              private router: Router,) { }

  login(user: UserLoginModel): Observable<any> {
    return this.http.post<any>(ApiUrls.API_MAIN + "login", user)
  }
  register(user: UserRegisterModel): Observable<any> {
    return this.http.post<any>(ApiUrls.API_MAIN + "register", user)
  }
  addRole(userRole: UserRole): Observable<any> {
    return this.http.post<any>(ApiUrls.API_MAIN + "role/addtouser", userRole)
  }
  saveToken(response: any){
    const helper = new JwtHelperService()
    let token = JSON.parse(JSON.stringify(response))
    const decodedToken = helper.decodeToken(token.access_token);
    if(decodedToken.roles.includes("USER"))
      this.router.navigate(['main-page']);
    if(decodedToken.roles.includes("ADMIN"))
      this.router.navigate(['admin-page']);

    localStorage.setItem("token", JSON.stringify(response));
  }
}
