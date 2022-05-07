import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import { map } from 'rxjs/operators';
import { Contacto } from '../models/contacto.model';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(private db: AngularFirestore) { }

  /**
   * Obtiene la lista de contactos del sistema
   * @returns Lista de contactos
   */
  getContactos(){
    const contactosCollection: AngularFirestoreCollection<Contacto> = this.db.collection('contactos');
    const contactos = contactosCollection.valueChanges({idField: '$key'});
    return contactos;
  }


  /**
   * Agrega a la base de datos el contacto ingresado
   * @param contacto Contacto a crear
   */
  addContacto(contacto: Contacto){
    return this.db.collection('contactos').add(contacto);
  }


  /**
   * Actualiza en la base de datos el contacto ingresado
   * @param contacto Contacto a modificar
   */
  updateContacto(contacto: Contacto){
    const id = contacto.$key;
    delete contacto.$key;
    return this.db.collection('contactos').doc(id).set(contacto);
  }


  /**
   * Elimina de la base de datos el contacto en base al id
   * @param id ID del contacto a eliminar
   */
  async deleteContacto(id: string){
    return this.db.collection('contactos').doc(id).delete();
  }


}
