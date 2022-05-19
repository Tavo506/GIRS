import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { UsuariosService } from './usuarios.service';
import { logInUsuario } from 'src/app/models/logInUsuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(public afAuth: AngularFireAuth, public userService: UsuariosService, private router: Router) {
    //Guardar en LocalStorage
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  //Register Nuevo Usuario
  newUser(userInput: Usuario) {
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
          text: '¡Se ha aceptado el registro con éxito!'
        });

      })
      .catch((error) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: "Solicite que a la persona que corrija el siguiente error e intente de nuevo" + error.message
        });
      });
  }

  //Insertar Usuario en la tabla
  setUserData(regisInfo: any, userInput: Usuario) {
    userInput.uid = regisInfo.uid;
    this.userService.insertUser(userInput);
  }


  // Sign in with email/password
  signIn(userInput: logInUsuario) {
    return this.afAuth
      .signInWithEmailAndPassword(userInput.email, userInput.password)
      .then((result) => {
        //Routing
        this.router.navigate(['/home']);

      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: error.message
        });
      });
  }

  // Logout
  logOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      //Route
    });
  }

  // Returns true when user is looged in and email is verified
  public get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }
}
