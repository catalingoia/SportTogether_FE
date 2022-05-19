import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JwtModule} from "@auth0/angular-jwt";
import {AppRoutingModule} from "./app-routing.module";
import { LoginComponent } from './dashboard/authentication/login/login.component';
import { RegisterComponent } from './dashboard/authentication/register/register.component';
import { AdminPageComponent } from './dashboard/admin-page/admin-page.component';
import { UserPageComponent } from './dashboard/user-page/user-page.component';
import { EventCardComponent } from './shared/components/event-card/event-card.component';
import {Interceptor} from "./core/interceptor/interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { EventCardAdminComponent } from './shared/components/event-card-admin/event-card-admin.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NgxPaginationModule} from "ngx-pagination";
import { EventCardVerifiedComponent } from './shared/components/event-card-verified/event-card-verified.component';
import {MatDividerModule} from "@angular/material/divider";
import { CreateEventModalComponent } from './shared/components/create-event-modal/create-event-modal.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {AgmCoreModule} from "@agm/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminPageComponent,
    UserPageComponent,
    EventCardComponent,
    EventCardAdminComponent,
    EventCardVerifiedComponent,
    CreateEventModalComponent,

  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5wKPNCtSBMMt5SpRP4DjF74cyKpXCVsA',
      libraries: ['places']
    }),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatNativeDateModule,
    MatDatepickerModule,
    NgbModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [/^null$/],
        disallowedRoutes: [],
      },
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatDividerModule,
    MatStepperModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    BsDatepickerModule.forRoot(),
    MatProgressSpinnerModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    MatDatepickerModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
