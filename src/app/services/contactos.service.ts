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



  async addContacto(contacto: Contacto){
    const res = await this.db.collection('contactos').add(contacto);
    console.log(res);
    
  }



}
