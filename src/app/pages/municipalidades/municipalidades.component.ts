import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-municipalidades',
  templateUrl: './municipalidades.component.html',
  styleUrls: ['./municipalidades.component.scss']
})
export class MunicipalidadesComponent implements OnInit {

  constructor(private reportService: ReportesService) { }

  ngOnInit(): void {
    
  }

}
