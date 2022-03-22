import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(private db: AngularFirestore) { }

  getContactos(){
    const contactos = this.db.collection('contactos').valueChanges();
    return contactos;
  }

}
