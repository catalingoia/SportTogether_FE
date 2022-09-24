import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./dashboard/authentication/login/login.component";
import {AdminPageComponent} from "./dashboard/admin-page/admin-page.component";
import {AuthGuard} from "./core/guards/authguard";
import {AdminAuthGuard} from "./core/guards/admin-authguard";
import {UserPageComponent} from "./dashboard/user-page/user-page.component";
import {RegisterComponent} from "./dashboard/authentication/register/register.component";
import {AccountPageComponent} from "./dashboard/account-page/account-page.component";


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin-page', component: AdminPageComponent, canActivate: [AuthGuard, AdminAuthGuard]},
  {path: 'main-page', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'account-page', component: AccountPageComponent, canActivate: [AuthGuard]},
  {path: '', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
