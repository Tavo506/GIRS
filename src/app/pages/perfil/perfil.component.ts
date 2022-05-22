import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { compareObjects } from 'src/app/util/objectHandlers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userData : any = {'nombre' : "Nombre del usuario", 'municipalidad' : "Municipalidad de ", 'telefono' : "Teléfono", 'email' : ""};
  
  usuario! : Usuario;

  constructor(private localStorage : LocalStorageService, 
              private  userService: UsuariosService, 
              private modalService: ModalService,
              private auth: AuthService,
              private router: Router ) {
  }

  ngOnInit(): void {
    this.getUserData(this.getUserId);
  }

/**
 * Obtiene el UID del usuarios loggeado del localstorage del browser.
 */
  get getUserId() : string{
    return JSON.parse(this.localStorage.getLocalStorage("user")).uid;
  }

/**
 * Obtenemos los datos necesarios del usuario para el perfil de la base de datos.
 * @param id Uuid del usuario loggeado
 */
  getUserData(id : string) : void{
    this.userService.getUser(id).then(
      (user : any) => {
        try{
          this.usuario = user;
          this.userData.nombre = user.nombre + " " + user.apellido;
          this.userData.municipalidad = "Municipalidad de " + user.municipalidad;
          this.userData.telefono = user.telefono;
          this.userData.email = user.email;
        }
        catch(e){
          console.log("Hubo un error al cargar el usuario");
        }
      }
    );
  }

/**
 * Función principal para editar un usuario
 */
  editarUsuario() {
    this.formPerfil(this.usuario);
  }

  /**
   * Función para abrir el modal para modificar los campos de un usuario
   * @param usuario Usuario cargado
  */
  private async formPerfil(usuario: Usuario) {
    this.modalService.modalPerfilOpen(usuario).then((res: { status: string, value: Usuario }) => {
      
      if (res.status === "OK") {  // Si se presionó el botón de guardar
        if (!compareObjects(usuario, res.value)) { // Se guarda o actualiza solo en caso de haber cambios
          this.updateUsuario(res.value);
        }
      }

    }).catch((err) => {
      // Solamente para que no muestre error al apretar escape
    });

  }
/**
 * Función para actualizar los datos del usuario
 * @param usuario Los datos del modificados del usuario
 */
  updateUsuario(usuario: Usuario){

    // Ventana de espera mientras se realizan las acciones
    Swal.fire({
      title: 'Por favor espera',
      text: 'Guardando los cambios',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let status;

    status = this.userService.updateUsuario(usuario);

    status.then(res => {

      // Ventana de guardado exitoso
      Swal.fire({
        title: "Usuario actualizado exitosamente!",
        icon: "success"
      });
      this.getUserData(this.getUserId);

    }).catch(err => {

      // Ventana de error
      Swal.fire({
        title: "Error al actualizar el usuario",
        text: err,
        icon: "error"
      });

    })

  }
/**
 * Funcion para eliminar mi propio usuario
 */
  deleteUsuario(){

    // Ventana de confirmación para eliminar el contacto
    Swal.fire({
      title: "Eliminar usuario",
      icon: "warning",
      text: "¿Seguro que desea eliminar el usuario?",
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
        this.userService.deleteUsuario(this.getUserId).then(res => {

          // Ventana de eliminación exitosa
          Swal.fire(
            '¡Eliminado!',
            'El usuario ha sido eliminado',
            'success'
          )
          
          this.auth.logOut();
          this.router.navigate(['/home']);

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

}
