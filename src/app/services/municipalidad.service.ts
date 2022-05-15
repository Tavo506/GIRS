import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Municipalidad } from '../models/municipalidad.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipalidadService {

  constructor(private db: AngularFirestore) { }

    getMunicipalidades(){
      const municipalidades = this.db.collection('girsData').valueChanges({idField: '$key'});
      return municipalidades;

  }

//Funcion para actualizar la municipalidad
  updateMunicipalidad(Municipalidad: Municipalidad){
    const id = Municipalidad.$key;
    delete Municipalidad.$key;
    return this.db.collection('girsData').doc(id).set(Municipalidad);
  }
}
