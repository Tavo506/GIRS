import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Contacto } from '../models/contacto.model';
import { ModalContacto } from '../widgets/modal-contacto/modal-contacto.component';
import { ContactosService } from './contactos.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modal: NgbModal,
    private modalConfig: NgbModalConfig
  ) { }


  /**
   * Función para abrir el modal para creación o modificación de un contacto
   * @param contacto Contacto nuevo o existente
   * @param titulo Texto para el título del modal
   * @param accion Acción del modal (Guardar o Editar)
   * @returns Resultado del modal ({status: string, value: Contacto})
   */
  async modalContactoOpen(contacto: Contacto, titulo: string, accion: "Guardar" | "Editar") {
    const modalRef = this.modal.open(ModalContacto, { centered: true });
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.accion = accion;
    modalRef.componentInstance.contacto = { ...contacto };  // Se clona el contacto para no actualizar la misma referencia
    modalRef.componentInstance.buildForm();

    return await modalRef.result;
  }

  


}
