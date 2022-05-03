import { Component, Input, OnInit } from '@angular/core';
import { ChartTypeRegistry, Segment } from 'chart.js';
import { Reporte } from 'src/app/models/reporte.model';


@Component({
  selector: 'app-grafico-plot',
  templateUrl: './grafico-plot.component.html',
  styleUrls: ['./grafico-plot.component.scss']
})


export class GraficoPlotComponent implements OnInit {
  
  @Input() data: Reporte[] = []; 
  @Input() plotType: "bar" | "line" = "bar";
  @Input() column!: string;
  @Input() segment!: string;
  
  constructor() {
    

  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels : string[] = [];
  public barChartType = this.plotType as keyof ChartTypeRegistry;
  public barChartLegend = true;
  public barChartData : any[] = [];




  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType = 'bar' as keyof ChartTypeRegistry;
  // public barChartLegend = true;
  // public barChartData = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  // ];


  ngOnInit(): void {
    // Se hace elem como any para poder acceder de forma dinámica a la columna que se requiere
    this.data.forEach(elem => {
      
      let key1 = this.column as keyof typeof elem;
      let subElem = elem[key1];
      let key2 = this.segment as keyof typeof subElem;
      let dato = subElem![key2] + '';

      dato = dato.replace(" ", "");

      this.barChartLabels.push(elem.anno + "")
      
      console.log(this.barChartData);
      this.barChartData.push({
        data: [dato],
        label: elem.canton
      })
    });
  }

}
