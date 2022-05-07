import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Contacto } from '../models/contacto.model';
import { ModalContacto } from '../widgets/modal-contacto/modal-contacto.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modal: NgbModal,
    private modalConfig: NgbModalConfig
  ) { }


  modalContactoOpen(contacto: Contacto, titulo: string, textoConfirmar: string) {
    const modalRef = this.modal.open(ModalContacto, { centered: true });
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.textoConfirmar = textoConfirmar;
    modalRef.componentInstance.contacto = contacto;
    modalRef.componentInstance.buildForm();
  }


}
