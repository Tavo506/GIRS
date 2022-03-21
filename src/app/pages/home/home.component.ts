import { Component, OnInit } from '@angular/core';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private municipalidades : any[] = [];

  constructor(private MunicipalidadService:MunicipalidadService) {

    console.log(MunicipalidadService.getMunicipalidades())

  }

  ngOnInit(): void {
    this.MunicipalidadService.getMunicipalidades().subscribe(
      dataMunicipalidad =>{
        this.municipalidades = dataMunicipalidad;
      }
    );
  }

  DummyPrint():void{
    console.log(this.municipalidades)
  }

}
