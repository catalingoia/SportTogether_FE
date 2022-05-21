import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventCardModel} from "../../models/event-card.model";
import {EventsService} from "../../../services/events.service";
import {AdminCardEmitterApprove} from "../../models/admin-card-emitter-approve";

@Component({
  selector: 'app-event-card-verified',
  templateUrl: './event-card-verified.component.html',
  styleUrls: ['./event-card-verified.component.css']
})
export class EventCardVerifiedComponent implements OnInit {
  @Input() event: EventCardModel;
  @Output() newAcceptEvent = new EventEmitter<string>()

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    console.log(this.event.rejected)
    console.log(this.event.accepted)
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
