import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  private reports : any[] = [];
  private components_workflow : any[] = [];
  private filters : any = {};

  constructor(private reportService : ReportesService) { }

  ngOnInit(): void {
    this.reportService.getReportes().subscribe(
      report =>{
        console.log(report)
        this.reports = report.map( el => {  
          this.addElementWorkflow(el)
          return el 
        });
        console.log(this.reports)
      }
    );
  }

  private addElementWorkflow(element : any){
    var workflow = this.getWorkflowForms();
    var row = this.createCardElement(element);
    this.components_workflow.push(row);
    //agregar a lista de filtros aqui
    workflow?.appendChild(row);
  }

  private createCardElement(element : any){
    
    var row = this.createRow();
    row.appendChild(this.createCol(element.anno));
    row.appendChild(this.createCol(element.datosGenerales.municipalidad));
    row.appendChild(this.createColwithIcon(['fas fa-arrow-alt-circle-down fa-lg']));
    return row;

  }

  private createRow(){
    var div = document.createElement('div');
    div.style.background = '#F8F8F8'
    div.classList.add('row');
    div.style.margin = '10px';
    div.style.height = '50px';
    return div;

  }

  private createCol(data : string){
    var div = document.createElement('div');
    div.classList.add('col');
    div.style.textAlign = 'center';
    div.style.marginTop = '10px';
    var h5 = document.createElement('h5');
    h5.innerText = data;
    h5.style.color ='#4A4A4A'; 
    div.appendChild(h5);
    return div;
  }


  private createColwithIcon(icons: string[]){
    var div = document.createElement('div');
    div.classList.add('col');
    div.style.textAlign = 'center';
    div.style.marginTop = '10px';

    icons.forEach(element => {
      var icon = document.createElement('i');
      var splitElement = element.split(' ');
      splitElement.forEach( nameClass => { 
        console.log(nameClass);
        icon.classList.add(nameClass)});

      //Aqui deberia aplicarse la funcionalidad al icono
      icon.style.color = '#4A4A4A';
      div.appendChild(icon);
    });
    
    return div;
  }

  private getWorkflowForms(){
      return document.getElementById('workflow_forms');
  }

}
