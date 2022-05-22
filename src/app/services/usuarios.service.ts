import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  constructor(private db: AngularFirestore) {
  }
/**
   * Inserta en la base de datos el usuario
   * @param userId Datos de usuario
*/
  insertUser(userInput : Usuario){
    return this.db.collection('usuarios').doc(userInput.uid).set(userInput);
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
