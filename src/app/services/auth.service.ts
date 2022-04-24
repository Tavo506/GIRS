import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {UsuariosService} from './usuarios.service';
import { logInUsuario } from 'src/app/models/logInUsuario.model';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public userService : UsuariosService){

  }
    //Register Nuevo Usuario
    newUser( userInput : Usuario ) {
      
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      return this.afAuth
      .createUserWithEmailAndPassword(userInput.email, userInput.password)
      .then((result) => {
        this.setUserData(result.user, userInput);
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          text: '¡Se ha registrado con éxito!'
        });

      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: error.message
        });
      });
    }

    //Insertar Usuario en la tabla
    setUserData(regisInfo: any, userInput: Usuario) {
      userInput.uid = regisInfo.uid;
      this.userService.insertUser(userInput);
    }

    
    // Sign in with email/password
    signIn(userInput : logInUsuario) {
    return this.afAuth
      .signInWithEmailAndPassword(userInput.email, userInput.password)
      .then((result) => {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          text: '¡Ha iniciado sesión con éxito!'
        });

        //Routing
        
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: error.message
        });
      });
  }
}
