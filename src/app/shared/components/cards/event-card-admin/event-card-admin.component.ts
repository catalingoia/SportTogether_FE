import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventCardModel} from "../../../models/event-card.model";
import {EventsService} from "../../../../services/events.service";
import {AdminCardEmitterApprove} from "../../../models/admin-card-emitter-approve";

@Component({
  selector: 'app-event-card-admin',
  templateUrl: './event-card-admin.component.html',
  styleUrls: ['./event-card-admin.component.css']
})

export class EventCardAdminComponent implements OnInit {

  @Input() event: EventCardModel;
  @Output() newAcceptEvent = new EventEmitter<AdminCardEmitterApprove>()

  constructor(private eventsService: EventsService) {
  }

  expired: boolean = false

  ngOnInit(): void {
    let eventDate = new Date(this.event.date).getTime()
    let todayDate = new Date().getTime()
    if (eventDate < todayDate) {
      this.expired = true
    }
  }


  acceptEvent(eventId: string, approved: boolean) {
    this.eventsService.acceptEvent(eventId, approved).subscribe(
      _ => this.newAcceptEvent.emit({eventId, approved}));
  }

  deleteEvent(eventId: string) {
    this.eventsService.deleteEvent(eventId).subscribe(
      _ => this.newAcceptEvent.emit());
  }
}
