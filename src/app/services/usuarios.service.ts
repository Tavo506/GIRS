import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  constructor(private db: AngularFirestore) {
  }

  insertUser(userInput : Usuario){
    return this.db.collection('usuarios').doc(userInput.uid).set(userInput);
  }

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

  getUsers(){
    const users = this.db.collection('usuarios').valueChanges();
    return users;
  }
}
