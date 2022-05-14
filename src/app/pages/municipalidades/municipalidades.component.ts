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

  municipalidad_en_edicion: Municipalidad | undefined = undefined;


  constructor(private municipalidadesService: MunicipalidadService) { }

  ngOnInit(): void {
    let getR = this.municipalidadesService.getMunicipalidades().subscribe(res => {
      this.municipalidades = res as Municipalidad[];
      getR.unsubscribe();
      this.municipalidades.sort((a,b) => a.canton.localeCompare(b.canton))
      
    })
  }

  getColumnas(selected_municipalidad:string): void {
    
    if(selected_municipalidad == "Ninguno"){
      this.municipalidad_en_edicion = undefined;
    }

    this.municipalidad_en_edicion = this.municipalidades.find(element => element.canton == selected_municipalidad)

    
  }


}
