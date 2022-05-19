import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Municipalidad } from 'src/app/models/municipalidad.model';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';

import { AuthService } from 'src/app/services/auth.service';

import { sortJson } from "src/app/util/sort";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  //Modules
  form : FormGroup;
  //Variables
  usuario : Usuario = this.Usuario();
  municipalidades : Municipalidad[] = [];

  constructor(
    private formBuilder: FormBuilder, 
    private MunicipalidadService:MunicipalidadService,
    private auth: AuthService,
    private usuariosServices: UsuariosService
  ) 
  {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['',Validators.required],
      municipalidad: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //Obtengo las municipalidades
    this.MunicipalidadService.getMunicipalidades().subscribe(
      dataMunicipalidad =>{
        this.municipalidades = sortJson(dataMunicipalidad as Municipalidad[], 'canton', -1);
      }
    );
  }


  register(){

    //Get User Inputs
    this.usuario.nombre = this.form?.get('nombre')?.value;
    this.usuario.apellido = this.form?.get('apellido')?.value;
    this.usuario.municipalidad = this.form?.get('municipalidad')?.value;
    this.usuario.email = this.form?.get('email')?.value;
    this.usuario.password = this.form?.get('password')?.value;
    this.usuario.telefono = this.form?.get('telefono')?.value;

    //Sign In User
    this.usuariosServices.insertTempUser(this.usuario);
  }

  //User Model
  Usuario(){
    return {
      uid: "",
      nombre : "",
      apellido: "",
      municipalidad: "",
      email: "",
      password: "",
      telefono: ""
    }
  }

}
