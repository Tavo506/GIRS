import { Component, OnInit } from '@angular/core';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';
import { Municipalidad } from 'src/app/models/municipalidad.model';

@Component({
  selector: 'app-municipalidades',
  templateUrl: './municipalidades.component.html',
  styleUrls: ['./municipalidades.component.scss']
})
export class MunicipalidadesComponent implements OnInit {

  municipalidades : Municipalidad[] = []
  columnas : String[] = []
  municipalidad_en_edicion: Municipalidad | undefined = undefined;


  constructor(private municipalidadesService: MunicipalidadService) { }

  ngOnInit(): void {
    let getR = this.municipalidadesService.getMunicipalidades().subscribe(res => {
      this.municipalidades = res as Municipalidad[];
      getR.unsubscribe();
      
    })
  }

  getColumnas(selected_municipalidad:string): void {

    this.municipalidad_en_edicion = this.municipalidades.find(element => element.canton == selected_municipalidad)

    this.columnas = Object.getOwnPropertyNames(this.municipalidad_en_edicion)
    this.columnas = this.columnas.sort()
    
    console.log(this.columnas)
  }


}
