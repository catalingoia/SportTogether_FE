import {Component, OnInit} from '@angular/core';
import {EventCardModel} from "../../shared/models/event-card.model";
import {BaseComponent} from "../../core/components/base.component";
import {EventsService} from "../../services/events.service";
import {takeUntil} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

interface Filter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent extends BaseComponent implements OnInit {
  filter: Filter[] = [
    {value: 'approved', viewValue: 'Verified'},
    {value: 'unapproved', viewValue: 'Unapproved'},
  ];
  events: EventCardModel[] = [];
  username: string
  activeFilter="unapproved";
  count = 0;
  page = 0;
  pageSize= 6;

  constructor(private eventsService: EventsService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getAllUnapprovedEvents(0);
    const helper = new JwtHelperService()
    let token = JSON.parse(localStorage.getItem('token')!);
    const decodedToken = helper.decodeToken(token.access_token);
    this.username = decodedToken.sub
  }

  handleAcceptEvent(event: any){
    this.handlePageChange(1)
  }


  getAllEvents(page: number, pageSize: number = this.pageSize) {
    this.eventsService.getAllEvents(page, pageSize).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (response) => {
        this.count = response.totalItems;
        this.events = response.events;
      })
  }

  getAllUnapprovedEvents(page: number, pageSize: number = this.pageSize) {
    this.eventsService.getAllUnapprovedEvents(page, pageSize).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (response) => {
        this.count = response.totalItems;
        this.events = response.events;
        console.log(this.events)

      })
  }


  changeFilter(event: any) {
    if (event.value == "approved") {
      this.getAllEvents(0);
      this.activeFilter = "approved";
      this.page = 1;
    }
    if (event.value == "unapproved") {
      this.getAllUnapprovedEvents(0);
      this.activeFilter = "unapproved";
      this.page = 1;
    }

  }

  handlePageChange(event: number): void {
    this.page = event;
    console.log(this.page)
    if (this.activeFilter == "approved")
      this.getAllEvents(this.page - 1);
    console.log(this.activeFilter)
    if (this.activeFilter == "unapproved")
      this.getAllUnapprovedEvents(this.page - 1);
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login']);
  }

  redirectToMain() {
    this.router.navigate(['main-page']);

  }
}
