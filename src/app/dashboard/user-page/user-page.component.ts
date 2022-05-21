import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventsService} from "../../services/events.service";
import {takeUntil} from "rxjs";
import {EventCardModel} from "../../shared/models/event-card.model";
import {BaseComponent} from "../../core/components/base.component";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent extends BaseComponent implements OnInit {
  events: EventCardModel[] = []
  count = 0;
  page = 0;
  pageSize = 6;

  mapLoaded: Promise<boolean>
  map: google.maps.Map;
  mapClickListener: google.maps.MapsEventListener;

  constructor(private router: Router,
              private eventsService: EventsService,
              private modalService: ModalService) {
    super();
  }

  ngOnInit(): void {
    this.getAllApprovedEvents(0);


  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login']);
  }

  joinEvent(event: any) {
    this.getAllApprovedEvents(0)
  }

  getAllApprovedEvents(page: number, pageSize: number = this.pageSize) {
    this.eventsService.getAllAcceptedEvents(page, pageSize).pipe(takeUntil(this.unsubscribe$)).subscribe(
      (response) => {
        this.count = response.totalItems;
        this.events = response.events;
        this.events.forEach(event => event.createTimestamp = new Date(event.createTimestamp))
      })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllApprovedEvents(this.page - 1);
  }

  openModal(): void {
    this.modalService.openModal().then((response) => {
      console.log(response)
    })

  }
}
