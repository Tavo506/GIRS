import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, deleteUser, User } from "firebase/auth";

import { UsuariosService } from './usuarios.service';
import { logInUsuario } from 'src/app/models/logInUsuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
      public afAuth: AngularFireAuth, 
      public userService: UsuariosService,
      private router: Router,
      private localStorageService: LocalStorageService
      ) {
    //Guardar en LocalStorage
    this.afAuth.authState.subscribe((user) => {
      if (this.isLoggedIn) {
        return;
      }
      if (user) {
        this.userData = user;
        localStorageService.setLocalStorage('GIRS_user', JSON.stringify(this.userData));
        JSON.parse(localStorageService.getLocalStorage('GIRS_user')!);
      } else {
        localStorageService.setLocalStorage('GIRS_user', 'null');
        JSON.parse(localStorageService.getLocalStorage('GIRS_user')!);
      }
    });
  }


  deleteUser(userId: string) {
    const auth = getAuth();

    let tempUser : User = {
      uid: userId,
      emailVerified: false,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: function ():any {
      },
      getIdToken: function (forceRefresh?: boolean): any {
      },
      getIdTokenResult: function (forceRefresh?: boolean): any{
      },
      reload: function (): any {
      },
      toJSON: function (): any {
      },
      displayName: null,
      email: "pruebasmail@gmail.com",
      phoneNumber: null,
      photoURL: null,
      providerId: ''
    };


    return deleteUser(tempUser).then(res => {
      console.log(res);
      
      Swal.fire("Usuario eliminado", "El usuario ha sido eliminado", "success");
      //this.userService.deleteUser(userId);
    }).catch(err => {
      console.error(err);
    })
  }


  deleteMe() {
    const auth = getAuth();
    const user = auth.currentUser;

    return this.userService.deleteUser(user!.uid).then(res => {
      
      deleteUser(user!).then(res => {
        Swal.fire("Usuario eliminado", "El usuario ha sido eliminado", "success");
        this.logOut();
      });
    }).catch(err => {
      console.error(err);
    })
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
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          text: '¡Se ha aceptado el registro con éxito!'
        });
        
        
      })
      .catch((error) => {
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
        
        this.localStorageService.setLocalStorage("GIRS_user", JSON.stringify(result.user));
        
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
      this.localStorageService.removeLocalStorage('GIRS_user');
      //Route
    });
  }

  // Returns true when user is looged in and email is verified
  public get isLoggedIn(): boolean {
    const user = JSON.parse(this.localStorageService.getLocalStorage('GIRS_user')!);
    return user !== null;
  }
}
