import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventCardModel} from "../../../models/event-card.model";
import {AdminCardEmitterApprove} from "../../../models/admin-card-emitter-approve";
import {EventsService} from "../../../../services/events.service";
import {JwtHelperService} from "@auth0/angular-jwt";

export interface JoinEmitter{
  eventId: string
  email: string
}
@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})

export class EventCardComponent implements OnInit {
  @Input() event: EventCardModel;
  @Output() newJoin = new EventEmitter<JoinEmitter>()
  isDisabled: boolean = false
  panelOpenState: boolean;


  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.event.isJoined = false;
    if(this.event.participants.length > 0){
      const helper = new JwtHelperService()
      let token = JSON.parse(localStorage.getItem('token')!);
      const decodedToken = helper.decodeToken(token.access_token);
      this.event.participants.forEach( (participant: any) =>{
        if(participant.email == decodedToken.sub) {
          this.event.isJoined = true;
        }})
    }
    if(this.event.maxPlayers == this.event.participants.length)
      this.isDisabled = true;
  }

  joinEvent(eventId: string){
    const helper = new JwtHelperService()
    let token = JSON.parse(localStorage.getItem('token')!);
    const decodedToken = helper.decodeToken(token.access_token);
    let email = decodedToken.sub
    this.eventsService.joinEvent(eventId, email).subscribe(
      _ => this.newJoin.emit({eventId, email})
    )
  }

  leaveEvent(eventId: string){
    const helper = new JwtHelperService()
    let token = JSON.parse(localStorage.getItem('token')!);
    const decodedToken = helper.decodeToken(token.access_token);
    let email = decodedToken.sub
    this.eventsService.leaveEvent(eventId, email).subscribe(
      _ => {
        this.event.isJoined = false;
        this.newJoin.emit({eventId, email})


      }

    )
  }
}
