import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { Municipalidad } from '../models/municipalidad.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipalidadService {

  constructor(private db: AngularFirestore) { }

    getMunicipalidades(){
      const municipalidades = this.db.collection('girsData').valueChanges();
      return municipalidades;

  }
}
