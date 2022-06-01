import {Injectable} from "@angular/core";
import {CreateEventModalComponent} from "../shared/components/create-event-modal/create-event-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {
  }

  openModal(): Promise<any> {
    const modalRef = this.modalService.open(CreateEventModalComponent,{size:'lg',});
    return modalRef.result;
  }
}
