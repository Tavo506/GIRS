import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { Reporte } from 'src/app/models/reporte.model';



@Component({
  selector: 'app-comparativas',
  templateUrl: './comparativas.component.html',
  styleUrls: ['./comparativas.component.scss']
})


export class ComparativasComponent implements OnInit {

  reportes : Reporte[] = [];
  municipalidades : string[] = [];
  annos : number[] = [];

  selectedReports : Reporte[] = [];

  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {
    let getR = this.reportesService.getReportes().subscribe(res => {
      this.reportes = res as Reporte[];
      
      getR.unsubscribe();

      this.getMunicipalidades();

    })
  }

  getMunicipalidades(){
    this.reportes.forEach(element => {
      if(element.canton && !this.municipalidades.includes(element.canton)){
        this.municipalidades.push(element.canton);
      }
    });
    this.municipalidades.sort();
  }

  filtrarAnnos(Valores:string) {
    
    let listaReportes = this.reportes.filter(e => e.canton == Valores);
    this.annos = listaReportes.map(x => x.anno)
    
  }

  AgregarReporteATabla(Municipalidad:string, Anno:string) {
    this.selectedReports = this.selectedReports.concat(this.reportes.filter(e => e.canton == Municipalidad && e.anno == parseInt(Anno)));
  }

  DeleteMe(index:number){
    this.selectedReports.splice(index,1);
  }

}
