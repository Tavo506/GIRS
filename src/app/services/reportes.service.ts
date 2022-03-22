import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private db: AngularFirestore) { }

  getReportes(){
    const reports = this.db.collection('formularios').valueChanges();
    return reports;
  }
}
