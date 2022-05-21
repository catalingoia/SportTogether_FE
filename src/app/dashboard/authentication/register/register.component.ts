import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {UserLoginModel, UserRole} from "../../../shared/models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup
  registerValid: boolean

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  public userRole: UserRole = {email: '', roleName: ''};
  public loginInfo: UserLoginModel = {email: '', password: ''};

  register(): void {
    this.userRole.email = this.registerForm.get('email')?.value;
    this.userRole.roleName = "USER";
    this.loginInfo.email = this.registerForm.get('email')?.value;
    this.loginInfo.password = this.registerForm.get('password')?.value;

    this.authenticationService.register(this.registerForm?.value).subscribe(
      (response) => {
        if (response) {
          this.authenticationService.addRole(this.userRole).subscribe(_ => {
            this.authenticationService.login(this.loginInfo).subscribe((response) =>
              this.authenticationService.saveToken(response));
          });
        }
      },
      error => this.registerValid = false)
  }

  ngOnInit(): void {
    this.registerValid = true;
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

}
