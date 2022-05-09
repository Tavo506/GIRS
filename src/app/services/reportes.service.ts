import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Reporte } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private db: AngularFirestore) { }

  getReportes(){
    const reports = this.db.collection('formularios').valueChanges({idField: '$key'});
    return reports;
  }

  getReporte(id: string){
    const reports = this.db.collection('formularios').doc(id).valueChanges({idField: '$key'});
    return reports;
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
}
