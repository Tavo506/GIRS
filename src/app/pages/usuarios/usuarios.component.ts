import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  bitActive : boolean;
  users : any[] = [];
  listToUse : any[] = [];
  tempUsers : any[] = [];
  tempList  : any[] = [];

  constructor(private usersService: UsuariosService, private authService: AuthService) { 
    //Funcion para obtener lista de usuarios registrados
    this.bitActive = true;
    this.usersService.getUsers().subscribe( 
      users => {
        this.users = users;
        this.listToUse = [...users];
      }
    )

    //Funcion para obtener lista de solicitudes de registro
    this.usersService.getTempUsers().subscribe( 
      users => {
        this.tempUsers = users;
        this.tempList = [...users];
      }
    )
  }

  ngOnInit(): void {
  }

  getBitActive(): boolean {
    return this.bitActive;
  }

  getTheadThree() : string{
    if(this.bitActive === true){
      return "Acciones";
    }
    else{ 
      return "Aceptar/Rechazar";
    }
  }

  getCompleteName(user : any) : string {
    return user.nombre + ' ' + user.apellido 
  }

  deleteUser(uid : string) : void {
    this.usersService.deleteUser(uid);
    this.listToUse = [...this.users];
  }


  changeState() : void {
    if(this.bitActive){
      this.bitActive = false;
    }
    else{
      this.listToUse = [...this.users];
      this.bitActive = true;
    }
  }


  deleteTempUser(uid : any) : void {
    this.usersService.deleteTempUser(uid);
    Swal.fire({
      allowOutsideClick: false,
      icon: 'success',
      text: '¡Se ha rechazado la solicitud de registro con éxito!'
    });
  }

  createUser(user : any) : void {
    this.authService.newUser(user)
    this.deleteTempUser(user.uid)
  }



}
