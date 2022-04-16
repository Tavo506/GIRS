import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { logInUsuario } from 'src/app/models/logInUsuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  //Modules
  form : FormGroup;
  //Variables
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  usuario: logInUsuario = this.Usuario();

  constructor(private formBuilder: FormBuilder, private router: Router,) 
  {
    this.form = this.formBuilder.group({
      usuario: ['',[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }

  /*Función que realiza el inicio de sesión
    Parameters:
    usuario : String
    password: String
  */
      
  logIn() {
    this.usuario.usuario = this.form?.get('usuario')?.value;
    this.usuario.password = this.form?.get('password')?.value;

  }

  Usuario(){
    return {
      usuario : "",
      password : "",
    }
  }
}


/*Animations

https://jasonwatmore.com/post/2019/11/04/angular-8-router-animation-tutorial-example

Referencias LogIn

https://github.com/Tavo506/Comunidad-Intro-Taller/blob/main/src/app/pages/login/login.component.ts



*/