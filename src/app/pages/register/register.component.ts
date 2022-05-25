import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Municipalidad } from 'src/app/models/municipalidad.model';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';

import { AuthService } from 'src/app/services/auth.service';

import { sortJson } from "src/app/util/sort";
import Swal from 'sweetalert2';
import {encriptar} from "src/app/util/encryptador"

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
      email: ['', [Validators.required, Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]]
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

    if(!this.validarInput()){
      Swal.fire({
        title: 'Error en el formato de la solicitud de registro',
        icon: 'error',
        text: 'Los campos seleccionados no cumplen los requisitos, por favor revisar nuevamente.'
      });
      return;
    }
    
    //Get User Inputs
    this.usuario.nombre = this.form?.get('nombre')?.value;
    this.usuario.apellido = this.form?.get('apellido')?.value;
    this.usuario.municipalidad = this.form?.get('municipalidad')?.value;
    this.usuario.email = this.form?.get('email')?.value;
    this.usuario.password = encriptar("123456$#@$^@2ERF",this.form?.get('password')?.value)
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


  validarInput() : boolean {
    if(this.form.invalid){
      Object.values( this.form.controls ).forEach (control =>{
        if (control instanceof FormGroup){
             Object.values(control.controls).forEach (innerControl =>{
              innerControl.markAllAsTouched();
             })
        }else {
          control.markAsTouched();
        }
      })
      return false;
    }else{
      return true;
    }
  }


  // ###################################
  // #     Gets de inputs invalidos    #
  // ###################################

  campoInvalido(campo: string) : boolean {
    return this.form.get(campo)!.invalid && this.form.get(campo)!.touched ;
  }

  get nombreInvalido() {
    return this.campoInvalido("nombre");
  }

  get apellidoInvalido() {
    return this.campoInvalido("apellido");
  }

  get telefonoInvalido() {
    return this.campoInvalido("telefono");
  }
  
  get correoInvalido() {
    return this.campoInvalido("email");
  }

  get passwordInvalido() {
    return this.campoInvalido("password");
  }

  get municipalidadInvalido(){
    return this.campoInvalido("municipalidad");
  }


}
