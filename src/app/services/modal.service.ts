import {Injectable} from "@angular/core";
import {CreateEventModalComponent} from "../shared/components/modals/create-event-modal/create-event-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ParticipantModalComponent} from "../shared/components/modals/participant-modal/participant-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {
  }

  openParticipantsModal(event: any): Promise<any> {
    const modalRef = this.modalService.open(ParticipantModalComponent,{size:'sm',  centered: true});
    modalRef.componentInstance.event = event;

    return modalRef.result.then((result) => {
      console.log(result);})
  }
  openModal(): Promise<any> {
    const modalRef = this.modalService.open(CreateEventModalComponent,{size:'lg',});
    return modalRef.result;
  }
}
