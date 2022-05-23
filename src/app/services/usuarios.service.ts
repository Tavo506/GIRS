import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario.model';
import Swal from "sweetalert2"
import { Observable } from 'rxjs';
import { USE_EMULATOR } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  constructor(private db: AngularFirestore) {
  }

  insertTempUser(userInput: Usuario){

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    this.getTempUsersByMail(userInput.email).then(res => {
      if(res.length>0){
        Swal.fire({
            icon: 'error',
            title: 'Error al solicitar registro',
            text: "Correo ya utilizado"
          });
      } else {
        this.db.collection('solicitudUsuarios').add(userInput)
          Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            text: '¡Se ha registrado tu solicitud con exito!'
          });
      }
    })
   
  }

  async usuariosEnEspera() {
    let solicitudes = new Promise<Usuario[]>(resolve => {

      this.getTempUsers().subscribe(res => {
       
        let usuarios = (res as unknown as Usuario[]);
         
        resolve(usuarios as Usuario[]);
      });
    });
    
    let res = await solicitudes
    return (await solicitudes).length>0
  }

  deleteTempUser(uid : string){
    return this.db.collection('solicitudUsuarios').doc(uid).delete();
  }

  getTempUser(userId : string){
    
    return this.db.collection('solicitudUsuarios').doc(userId).ref.get()
    .then(

      (doc) => {
        if (doc.exists) {
          return doc.data();
        }
        else{
          return [];
        }
      }
    );
  }

  getTempUsersByMail(userEmail: string): Promise<Usuario[]> {
    return new Promise(resolve => {

        let datos = this.getTempUsers().subscribe(res => {
       
        let reports = (res as unknown as Usuario[]);
       
        reports = reports.filter(res => res.email === userEmail);        
        resolve(reports as Usuario[]);
      });
    });
  }

  getTempUsers(){
    const users = this.db.collection('solicitudUsuarios').valueChanges({idField:"uid"});
    return users;
  }

/**
   * Inserta en la base de datos el usuario
   * @param userId Datos de usuario
*/
  insertUser(userInput : Usuario){
    return this.db.collection('usuarios').doc(userInput.uid).set(userInput);
  }

  deleteUser(uid : string){
    return this.db.collection('usuarios').doc(uid).delete();
  }

/**
 * Obtiene de la base de datos el usuario en base al id
 * @param userId ID del usuario
 */
  getUser(userId : string){
    
    return this.db.collection('usuarios').doc(userId).ref.get()
    .then(

      (doc) => {
        if (doc.exists) {
          return doc.data();
        }
        else{
          return undefined;
        }
      }
    );
  }

/**
 * Obtiene la lista de usuarios del sistema
 * @returns Lista de contactos
 */
  getUsers(){
    const users = this.db.collection('usuarios').valueChanges();
    return users;
  }



/**
   * Actualiza en la base de datos el usuario ingresado
   * @param usuario Usuario a modificar
   */
  updateUsuario(usuario : Usuario){
    return this.db.collection('usuarios').doc(usuario.uid).set(usuario);
  }

    /**
   * Elimina de la base de datos el usuario en base al id
   * @param id ID del usuario a eliminar
   */
  async deleteUsuario(id: string){
    return this.db.collection('usuarios').doc(id).delete();
  }
}
