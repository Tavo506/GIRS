import { ReturnStatement } from '@angular/compiler';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Reporte } from 'src/app/models/reporte.model';
import { ReportesService } from 'src/app/services/reportes.service';
import { sortJson, sortJsonByMuni } from 'src/app/util/sort';
import { ExcelService } from 'src/app/services/excel.service'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit{

  private reportsBackUp: Reporte[] = [];
  private filters: any = { 'municipalidades': [], 'annos': [] };
  public reportes: Reporte[] = [];

  constructor(private reportService: ReportesService, private excelService: ExcelService, private authService: AuthService) { }

  ngOnInit(): void {
    this.reportService.getReportes().subscribe(
      report => {
        var reportsSortAnno = sortJson([...report], "anno");
        this.reportsBackUp = sortJsonByMuni(report);
        this.reportes = [...this.reportsBackUp];
        for(let i=0; i<this.reportes.length;i++){
          this.addOptionFilter('municipalidades', this.reportsBackUp[i].datosGenerales.municipalidad);
          this.addOptionFilter('annos',  reportsSortAnno[i].anno);
        }
        this.completeSelects((this.filters['annos']),(this.filters['municipalidades']));
      }
    );
    
  };

  sendReportToService(document: any): void {
    this.excelService.exportAsExcelFile(document, document.datosGenerales.municipalidad)
  }

  descargarTodo(){
    this.excelService.downloadAll(this.reportes);
  }

  get isLoggedIn(){
    return this.authService.isLoggedIn
  }
 

  private completeSelects(setYears: any[], setMunicipalities: any[]) {
    var selectYear = document.getElementById('filter_year');
    var selectMunicipality = document.getElementById('filter_municipality');
    this.addOptionsSelect(selectYear, setYears);
    this.addOptionsSelect(selectMunicipality, setMunicipalities);
  }

  private addOptionsSelect(select: any, set: any[]) {
    set.forEach(opt => {
      select.appendChild(this.createOptionHTML(opt));
    });
  }

  private createOptionHTML(content: string) {
    var opt = document.createElement('option');
    opt.innerText = content;
    return opt;
  }

  public filter() {
    var selectYear = document.getElementById('filter_year');
    var selectMunicipality = document.getElementById('filter_municipality');
    this.applyFilter(this.getSelectItem(selectYear), this.getSelectItem(selectMunicipality));
  }

  private applyFilter(filterAnno: string, filterMunicipality: string) {

    if(filterMunicipality != 'Ninguno' && 'ninguno'){
      this.reportes = this.reportsBackUp.filter(e => e.datosGenerales.municipalidad === filterMunicipality);
    }else{
      this.reportes = [...this.reportsBackUp];
    }
    if(filterAnno != 'Ninguno' && 'ninguno'){
      this.reportes = this.reportes.filter(e => {return String(e.anno) === filterAnno});
    }

  }

  private addOptionFilter(index: any, option: any) {
    
    var dict = this.filters[index];
    if (dict.indexOf(option) === -1) {
      this.filters[index].push(option)
    }

  };

  private getSelectItem(select: any) {
    var i = select.selectedIndex;
    var selected_text = select.options[i].text;
    return selected_text;
  }

}
