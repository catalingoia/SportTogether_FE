import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-participant-modal',
  templateUrl: './participant-modal.component.html',
  styleUrls: ['./participant-modal.component.css']
})
export class ParticipantModalComponent implements OnInit {
  @Input() event: any;
  participants: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.participants = this.event.participants;
  }
}
