import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userData : any = {'nombre' : "Nombre del usuario", 'municipalidad' : "Municipalidad de ", 'telefono' : "Teléfono", 'email' : ""};

  constructor( private localStorage : LocalStorageService, private  userService: UsuariosService ) {
  }

  ngOnInit(): void {
    this.getUserData(this.getUserId);
  }

  //Obtiene el UID del usuarios loggeado del localstorage del browser. 
  get getUserId() : string{
    return JSON.parse(this.localStorage.getLocalStorage("user")).uid;
  }

  //Obtenemos los datos necesarios del usuario para el perfil de la base de datos.
  getUserData(id : string) : void{
    this.userService.getUser(id).then(
      (user : any) => {
        try{
          this.userData.nombre = user.nombre + " " + user.apellido;
          this.userData.municipalidad += user.municipalidad;
          this.userData.telefono = user.telefono;
        }
        catch(e){
          console.log("Hubo un error al cargar el usuario");
        }
      }
    );
  }
}
