import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventCardModel} from "../../../models/event-card.model";
import {EventsService} from "../../../../services/events.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {JoinEmitter} from "../event-card/event-card.component";
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'app-account-event-card',
  templateUrl: './account-event-card.component.html',
  styleUrls: ['./account-event-card.component.css']
})
export class AccountEventCardComponent implements OnInit {

  @Input() event: EventCardModel;
  @Output() delete = new EventEmitter<string>()
  isDisabled: boolean = false
  panelOpenState: boolean;


  constructor(private eventsService: EventsService,
              private modalService: ModalService) { }

  ngOnInit(): void {

  }


  deleteEvent(eventId: string) {
    this.eventsService.deleteEvent(eventId).subscribe(
      _ => this.delete.emit(eventId));
  }

  openModal(): void {
    this.modalService.openParticipantsModal(this.event).then((response) => {
      console.log(response)
    })

  }
}

