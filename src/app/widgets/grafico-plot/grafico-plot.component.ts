import { Component, Input, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { ChartTypeRegistry, Segment } from 'chart.js';
import { Reporte } from 'src/app/models/reporte.model';


@Component({
  selector: 'app-grafico-plot',
  templateUrl: './grafico-plot.component.html',
  styleUrls: ['./grafico-plot.component.scss']
})


export class GraficoPlotComponent implements DoCheck {
  
  @Input() data: Reporte[] = []; 
  @Input() plotType: "bar" | "line" = "bar";
  @Input() column!: string;
  @Input() segment!: string;
  lastLength: number = 0;
  
  constructor() {}

  

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels : string[] = ["Reportes"];
  public barChartType = this.plotType as keyof ChartTypeRegistry;
  public barChartLegend = true;
  public barChartData : any[] = [];


  ngDoCheck(): void {

    // Si la lista cambió de longitud actualiza
    if (this.data.length !== this.lastLength) {
      
      this.lastLength = this.data.length;

      this.barChartData = [];
      
      this.data.forEach(elem => {
        
        let key1 = this.column as keyof typeof elem;
        let subElem = elem[key1];
        let key2 = this.segment as keyof typeof subElem;
        let dato = subElem![key2] + '';
        
        dato = dato.replace(" ", "");
        
        this.barChartData.push({
          data: [dato],
          label: elem.canton + " - " + elem.anno+""
        })
      });
    }
  }

  

}
