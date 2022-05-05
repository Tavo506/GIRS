import { Component, OnInit } from '@angular/core';
import { ContactosService } from 'src/app/services/contactos.service';
import { Contacto } from 'src/app/models/contacto.model';
import { getSortIcon } from "src/app/util/sortIcons";
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  //Variables

  contactos: Contacto[] = [];

  constructor(private ContactosService: ContactosService, private authService: AuthService) { }

  ngOnInit(): void {

    this.ContactosService.getContactos().subscribe(
      datoContacto => {
        this.contactos = datoContacto as Contacto[];
        console.log(this.contactos);

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
    this.formContacto(nuevoContacto, "Crear Contacto", "Crear");
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
   * @param textoConfirmar Texto del botón de confirmar eje: "Guardar" | "Editar"
   * @returns Contacto con las modificaciones
   */
  private async formContacto(contacto: Contacto, titulo: string, textoConfirmar: string) {
    

    return contacto;
  }



  /**
   * Función para evaluar las entradas del formulario para que no sean vacías
   * @param value Valor a evaluar si es vacío
   * @returns true | false
   */
  private validEmpty(value: string): Promise<string | null> {
    return new Promise((resolve) => {
      if (value.trim() !== "") {
        resolve(null);
      } else {
        resolve("El campo no puede ser vacío");
      }
    })
  }



  /**
   * 
   * @param idContacto ID del contacto a eliminar
   */
  eliminarContacto(idContacto: any) {
    Swal.fire({
      title: "Eliminar contacto",
      icon: "warning",
      text: "¿Seguro que desea eliminar el contacto seleccionado?",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'El contacto ha sido eliminado',
          'success'
        )
      }
    })
  }





}
