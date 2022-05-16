import { Component, OnInit } from '@angular/core';
import { Reporte } from 'src/app/models/reporte.model';
import { ExcelService } from 'src/app/services/excel.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-mis-reportes',
  templateUrl: './mis-reportes.component.html',
  styleUrls: ['./mis-reportes.component.scss']
})
export class MisReportesComponent implements OnInit {

  reportsUser : any[] = [];
  lastReportUpdated : any;
  user : any = null;

  constructor(private reportesService: ReportesService, private localStorage : LocalStorageService, private excelService : ExcelService) { 
    this.user = JSON.parse(this.localStorage.getLocalStorage("user"));
    this.reportesService.getReportesPorUsuario(this.user.email).then( res => {
      this.reportsUser = res;
      this.lastReportUpdated = this.setLastReportUpdated();
    })
  }

  ngOnInit(): void {
  }

  downloadAll() : void {;
    this.excelService.downloadAll(this.reportsUser);
  }

  sendReportToService(document: any): void {
    this.excelService.exportAsExcelFile(document, document.datosGenerales.municipalidad)
  }

  deleteReport(id : string): void {
    this.reportesService.deleteReporte(id);
  }

  setLastReportUpdated(){
      var result : Reporte = this.reportsUser[0];
      for(let report of this.reportsUser){
        if(result.fechaModificacion < report.fechaModificacion){
          result = report.valueOf();
        }
      }
      return result;
  }

}
