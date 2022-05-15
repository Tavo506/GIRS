import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  bitActive : boolean;
  users : any[] = [];
  listToUse : any[] = [];

  constructor(private usersService: UsuariosService) { 
    this.bitActive = true;
    this.usersService.getUsers().subscribe( 
      users => {
        this.users = users;
        this.listToUse = [...users];
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



}
