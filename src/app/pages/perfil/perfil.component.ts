import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userId : string;
  userData : any = {'nombre' : "Nombre del usuario", 'municipalidad' : "Municipalidad de ", 'telefono' : "Teléfono", 'email' : ""};

  constructor( private localStorage : LocalStorageService, private  userService: UsuariosService ) {
    this.userId = JSON.parse(localStorage.getLocalStorage("user")).uid;
  }

  ngOnInit(): void {
    this.userService.getUser(this.userId).then(
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
    )
  }
}
