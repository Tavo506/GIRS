import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  constructor(private reportService: ReportesService) { }

  ngOnInit(): void {
    this.reportService.getReporte('uuid = "86BRWuAPJXcvDHf8fmwKfBYQBWI3"').subscribe(
      report => {
        console.log(report);
      }
    );
  }

}
