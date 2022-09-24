import { Component, OnInit } from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {BaseComponent} from "../../../core/components/base.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  extends BaseComponent  implements OnInit{
  public loginForm!: FormGroup;
  loginValid: boolean

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    super()
  }

  login(): void {
    this.authenticationService.login(this.loginForm?.value).subscribe(
      (response) => this.authenticationService.saveToken(response),
      error => this.loginValid = false);
  }
  ngOnInit(){
    this.loginValid = true;
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }
}
