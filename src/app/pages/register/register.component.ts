import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

import { Municipalidad } from 'src/app/models/municipalidad.model';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //Modules
  form : FormGroup;

  usuario : Usuario = this.Usuario();
  municipalidades : Municipalidad[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router, private MunicipalidadService:MunicipalidadService) 
  {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['',Validators.required],
      municipalidad: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //Obtengo las municipalidades
    this.MunicipalidadService.getMunicipalidades().subscribe(
      dataMunicipalidad =>{
        this.municipalidades = dataMunicipalidad as Municipalidad[];
      }
    );
  }


  register(){
    this.usuario.nombre = this.form?.get('nombre')?.value;
    this.usuario.apellido = this.form?.get('apellido')?.value;
    this.usuario.municipalidad = this.form?.get('municipalidad')?.value;
    this.usuario.email = this.form?.get('email')?.value;
    this.usuario.telefono = this.form?.get('telefono')?.value;

    console.log(this.usuario)
  }




  Usuario(){
    return {
      nombre : "",
      apellido: "",
      municipalidad: "",
      email: "",
      telefono: ""
    }
  }

}
