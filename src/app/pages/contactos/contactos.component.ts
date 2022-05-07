import { Component, OnInit } from '@angular/core';
import { ContactosService } from 'src/app/services/contactos.service';
import { Contacto } from 'src/app/models/contacto.model';
import { getSortIcon } from "src/app/util/sortIcons";
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/services/modal.service';
import { compareObjects } from 'src/app/util/objectHandlers';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  //Variables

  contactos: Contacto[] = [];

  constructor(
    private ContactosService: ContactosService,
    private authService: AuthService,
    private modalService: ModalService,
    private contactosService: ContactosService
  ) { }

  ngOnInit(): void {

    this.ContactosService.getContactos().subscribe(
      datoContacto => {
        this.contactos = datoContacto as Contacto[];
      }
    );
  }


  getSortIcon(elem: HTMLElement) {
    return getSortIcon(elem);
  }


  get showAdmin(): boolean {
    return this.authService.isLoggedIn;
  }



  // Funciones de los botones de administrador


  /**
   * Función principal para crear un nuevo contacto
   */
  crearContacto() {
    let nuevoContacto: Contacto = { nombre: "", apellido_1: "", apellido_2: "", telefono: "", correo: "" }
    this.formContacto(nuevoContacto, "Crear Contacto", "Guardar");
  }


  /**
   * Función principal para editar un contacto
   * @param contacto Contacto a editar
   */
  editarContacto(contacto: Contacto) {
    this.formContacto(contacto, "Editar Contacto", "Editar");
  }


  /**
   * Función para abrir el modal para modificar los campos de un contactos
   * @param contacto Contacto nuevo o existente
   * @param titulo Título del encabezado del modal
   * @param accion Texto del botón de confirmar eje: "Guardar" | "Editar"
   */
  private async formContacto(contacto: Contacto, titulo: string, accion: "Guardar" | "Editar") {

    this.modalService.modalContactoOpen(contacto, titulo, accion).then((res: { status: string, value: Contacto }) => {
      
      if (res.status === "OK") {  // Si se presionó el botón de guardar
        if (!compareObjects(contacto, res.value)) { // Se guarda o actualiza solo en caso de haber cambios
          this.accionContacto(accion, res.value);
        }
      }

    }).catch((err) => {
      // Solamente para que no muestre error al apretar escape
    });

  }


  /**
   * 
   * @param idContacto ID del contacto a eliminar
   */
  eliminarContacto(idContacto: any) {

    // Ventana de confirmación para eliminar el contacto
    Swal.fire({
      title: "Eliminar contacto",
      icon: "warning",
      text: "¿Seguro que desea eliminar el contacto seleccionado?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",

    }).then((result) => {

      if (result.isConfirmed) { // Si se confirmó la eliminación

        // Ventana de carga mientras se elimina
        Swal.fire({
          title: 'Por favor espera',
          text: 'Eliminando el contacto',
          allowOutsideClick: false
        });
        Swal.showLoading();

        // Manda a eliminar el contacto en base al ID
        this.contactosService.deleteContacto(idContacto).then(res => {

          // Ventana de eliminación exitosa
          Swal.fire(
            '¡Eliminado!',
            'El contacto ha sido eliminado',
            'success'
          )

        }).catch(err => {

          // Ventana de error al eliminar
          Swal.fire(
            'Erorr al eliminar',
            err,
            "error"
          )
        });
      }
    })
  }




  /**
   * Función para manejar la creación o modificación de contactos
   * @param accion La acción de guardar o editar
   * @param contacto El contacto a crear o editar
   */
  private accionContacto(accion: "Guardar" | "Editar", contacto: Contacto) {
    
    // Ventana de espera mientras se realizan las acciones
    Swal.fire({
      title: 'Por favor espera',
      text: 'Guardando los cambios',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let status;

    // Según la acción realiza la creación o modificación
    if (accion === 'Guardar') {
      status = this.contactosService.addContacto(contacto);
    } else {
      status = this.contactosService.updateContacto(contacto);
    }

    status.then(res => {

      // Ventana de guardado exitoso
      Swal.fire({
        title: "¡Contacto guardado exitosamente!",
        icon: "success"
      });

    }).catch(err => {

      // Ventana de error
      Swal.fire({
        title: "Error al guardar el contacto",
        text: err,
        icon: "error"
      });

    })

  }



}
