import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  constructor(private reportService : ReportesService) { }

  ngOnInit(): void {
    this.reportService.getReportes().subscribe(
      report =>{
        console.log(report)
      }
    );
  }

}
