import { Component, OnInit } from '@angular/core';
import { Municipalidad } from 'src/app/models/municipalidad.model';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private municipalidades : Municipalidad[] = [];

  constructor(private MunicipalidadService:MunicipalidadService) {

    console.log(MunicipalidadService.getMunicipalidades())

  }

  ngOnInit(): void {
    this.MunicipalidadService.getMunicipalidades().subscribe(
      dataMunicipalidad =>{
        this.municipalidades = dataMunicipalidad as Municipalidad[];
      }
    );
  }

  DummyPrint():void{
    console.log(this.municipalidades)
  }

}
