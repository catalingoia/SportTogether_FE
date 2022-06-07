import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventCardModel} from "../../../models/event-card.model";
import {EventsService} from "../../../../services/events.service";
import {AdminCardEmitterApprove} from "../../../models/admin-card-emitter-approve";

@Component({
  selector: 'app-event-card-verified',
  templateUrl: './event-card-verified.component.html',
  styleUrls: ['./event-card-verified.component.css']
})
export class EventCardVerifiedComponent implements OnInit {
  @Input() event: EventCardModel;
  @Output() newAcceptEvent = new EventEmitter<string>()
  expired: boolean = false;
  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    let eventDate = new Date(this.event.date).getTime()
    let todayDate = new Date().getTime()
    if (eventDate < todayDate) {
      this.expired = true
    }
  }

  acceptEvent(eventId: string, approved: boolean) {
    this.eventsService.acceptEvent(eventId, approved).subscribe(
      _ => this.newAcceptEvent.emit(eventId));
  }

  deleteEvent(eventId: string) {
    this.eventsService.deleteEvent(eventId).subscribe(
      _ => this.newAcceptEvent.emit(eventId));
  }
}
