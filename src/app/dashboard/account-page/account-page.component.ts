import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {EventsService} from "../../services/events.service";
import {takeUntil} from "rxjs";
import {BaseComponent} from "../../core/components/base.component";
import {EventCardModel} from "../../shared/models/event-card.model";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent extends BaseComponent implements OnInit {
  username: string;
  responsiveOptions;
  constructor(private router: Router,
              private eventsService: EventsService) {
    super();
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  pendingEvents: EventCardModel[] = []
  acceptedEvents: EventCardModel[] = []
  rejectedEvents: EventCardModel[] = []

  ngOnInit(): void {
    this.getPendingEventsByEmail();
    this.getRejectedEvents();
    this.getAcceptedEvents()

    const helper = new JwtHelperService()
    let token = JSON.parse(localStorage.getItem('token')!);
    const decodedToken = helper.decodeToken(token.access_token);
    this.username = decodedToken.sub
  }

  getPendingEventsByEmail(){
    this.eventsService.getPendingEventsByEmail().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (response) => {
        this.pendingEvents = response;
      })
  }

  getAcceptedEvents(){
    this.eventsService.getAcceptedEventsByEmail().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (response) => {
        this.acceptedEvents = response;
      })

  }

  getRejectedEvents(){
    this.eventsService.getRejectedEventsByEmail().pipe(takeUntil(this.unsubscribe$)).subscribe(
      (response) => {
        this.rejectedEvents = response;
      })

  }
  redirectToMain() {
    this.router.navigate(['main-page']);

  }
  logout() {
    localStorage.clear()
    this.router.navigate(['login']);
  }

  handleDeleteAcceptedEvent($event: string) {
    this.getAcceptedEvents()
  }

  handleDeleteRejectedEvents($event: string) {
    this.getRejectedEvents()
  }

  handleDeletePendingEvents($event: string) {
    this.getPendingEventsByEmail()
  }

}
