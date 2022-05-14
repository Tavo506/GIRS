import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  bitActive : boolean;

  constructor(private usersService: UsuariosService) { 
    this.bitActive = true;
  }

  ngOnInit(): void {
    console.log(this.getBitActive())
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

}
