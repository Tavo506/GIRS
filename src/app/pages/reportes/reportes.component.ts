import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  private reports: any[] = [];
  private components_workflow: any[] = [];
  private filters: any = { 'municipalidades': {}, 'annos': {} };
  reportes: any[] = [];

  constructor(private reportService: ReportesService) { }

  ngOnInit(): void {
    this.reportService.getReportes().subscribe(
      report => {
        this.reportes = report;
        this.reports = report.map(el => {
          this.addElementWorkflow(el)
          return el
        });
        this.completeSelects(Object.keys(this.filters['annos']), Object.keys(this.filters['municipalidades']));

      }
    );
  };

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

  private addElementWorkflow(element: any) {
    var workflow = this.getWorkflowForms();
    var row = this.createCardElement(element);
    this.components_workflow.push(row);
    this.addOptionFilter('municipalidades', element.datosGenerales.municipalidad, row);
    this.addOptionFilter('annos', element.anno, row);
    workflow?.appendChild(row);
  }

  private createCardElement(element: any) {

    var row = this.createRow();
    row.appendChild(this.createCol(element.anno));
    row.appendChild(this.createCol(element.datosGenerales.municipalidad));
    row.appendChild(this.createColwithIcon(['fas fa-arrow-alt-circle-down fa-lg']));
    return row;

  }

  private createRow() {
    var div = document.createElement('div');
    div.style.background = '#F8F8F8'
    div.classList.add('row');
    div.style.margin = '10px';
    div.style.minHeight = '60px';
    div.style.height = 'auto';
    return div;

  }

  private createCol(data: string) {
    var div = document.createElement('div');
    div.classList.add('col-4');
    div.style.textAlign = 'center';
    div.style.marginTop = '10px';
    var h5 = document.createElement('h5');
    h5.classList.add("content-text")
    h5.innerText = data;
    h5.style.color = '#4A4A4A';
    div.appendChild(h5);
    return div;
  }


  private createColwithIcon(icons: string[]) {
    var div = document.createElement('div');
    div.classList.add('col-4');
    div.style.textAlign = 'center';
    div.style.marginTop = '10px';

    icons.forEach(element => {
      var icon = document.createElement('i');
      var splitElement = element.split(' ');
      splitElement.forEach(nameClass => {
        icon.classList.add(nameClass)
      });

      //Aqui deberia aplicarse la funcionalidad al icono
      icon.style.color = '#4A4A4A';
      div.appendChild(icon);
    });

    return div;
  };

  public filter() {
    var selectYear = document.getElementById('filter_year');
    var selectMunicipality = document.getElementById('filter_municipality');
    this.applyFilter(this.getSelectItem(selectYear), this.getSelectItem(selectMunicipality));
  }

  private applyFilter(filterAnno: string, filterMunicipality: string) {
    var municipalities : any = [];
    var annos : any;

    this.hideRows();
    if(filterMunicipality === 'Ninguno'){
      municipalities = this.components_workflow;
    }else{
      municipalities = this.filters['municipalidades'][filterMunicipality];
    }

    if(filterAnno === 'Ninguno'){
      annos = this.components_workflow;
    }else{
      annos = this.filters['annos'][filterAnno];
    }
    municipalities.forEach((element: any) => {
      if(annos.indexOf(element) != -1){
        element.style.display = 'flex';
      }
    });
    
  }

  private hideRows(){
    this.components_workflow.forEach(div => {
      div.style.display = 'none';
    })
  };

  private addOptionFilter(index: any, option: any, component: any,) {
    var dict = this.filters[index];
    if (option in dict) {
      this.filters[index][option].push(component);
    }
    else {
      this.filters[index][option] = [component];
    }

  };

  private getSelectItem(select: any) {
    var i = select.selectedIndex;
    var selected_text = select.options[i].text;
    return selected_text;
  }

  private getWorkflowForms() {
    return document.getElementById('workflow_forms');
  };


}
