import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reporte } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private db: AngularFirestore) { }

  getReportes(){
    const reports = this.db.collection('formularios').valueChanges();
    return reports;
  }

  getReporte(id: string){
    return this.db.collection('formularios').doc(id).ref.get()
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

  updateReporte(idForm : string, form : Reporte){
    //Si no permite actualizar el registro existente, entonces toca borrar el doc y recrearlo con la nueva info.
    return this.db.collection('formularios').doc(idForm).set(form);
  }

  insertReporte(form : Reporte){
    return this.db.collection('formularios').add(form);
  }

}
