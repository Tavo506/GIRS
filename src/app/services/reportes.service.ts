import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Reporte } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private db: AngularFirestore) { }

  getReportes(){
    const reports = this.db.collection('formularios').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data() as Reporte;
            const ID = a.payload.doc.id;
            return { ID, ...data };
        });
      })
  );
    return reports;
  }

  getReporte(id: string){
    const reports = this.db.collection('formularios').valueChanges(id);
    return reports;
  }

  deleteReporte(ID: string){
    
    return this.db.collection('formularios').doc(ID).delete();
  }


  /**
   * Función para obtener los reportes de un usuario dado el email de este
   * @param userEmail Email del usuarios
   * @returns Reportes creados por el usuario dueño del email del
   */
  getReportesPorUsuario(userEmail: string): Promise<Reporte[]> {
    return new Promise(resolve => {

      this.getReportes().subscribe(res => {
       
        let reports = (res as unknown as Reporte[]);
       
        reports = reports.filter(res => res.datosGenerales.email === userEmail);        
        resolve(reports as Reporte[]);
      });
    });
  }

  getLastReportUpdated(){
    return this.db.collection('formularios', ref => ref.orderBy('fechaModificacion', 'desc')).valueChanges();
  }
}
