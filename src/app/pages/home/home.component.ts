import { Component, OnInit } from '@angular/core';
import { Municipalidad } from 'src/app/models/municipalidad.model';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';
import { getSortIcon} from "src/app/util/sortIcons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  municipalidades : Municipalidad[] = [];

  constructor(private MunicipalidadService:MunicipalidadService) {}

  getSortIcon(elem: HTMLElement){
    return getSortIcon(elem);
  }

  ngOnInit(): void {
    this.MunicipalidadService.getMunicipalidades().subscribe(
      dataMunicipalidad =>{
        this.municipalidades = dataMunicipalidad as Municipalidad[];

        // Se deben preprocesar los datos porque las variables de verdadero o falso vienen como "Si" o "No"
        this.municipalidades = this.municipalidades.map(m => {

          const reciclaje = m.programaDeReciclaje;
          
          if (reciclaje == "Si") {
            m.programaDeReciclaje = true;
          }else if (reciclaje == "No") {
            m.programaDeReciclaje = false;
          }
          

          const rsv = m.recoleccionDeResiduosSolidosValorizables;

          if (rsv == "Si") {
            m.recoleccionDeResiduosSolidosValorizables = true;
          }else if (rsv == "No") {
            m.recoleccionDeResiduosSolidosValorizables = false;
          }

          return m;
        })
      }
    );
  }



  /**
   * Funciones para iconos de la tabla
   */

  /**
   * Función para determinar qué icono mostrar en base a un estado, retorna el código CSS respectivo
   * @param state El dato que se quiere comprobar si es true, false o nulo
   * @returns Las clases CSS para mostrar el icono correspondiente
   */
  getStateIcon(state: string | boolean){
    if (state === "") {
      return 'fa-circle-minus neutral-icon'
    }else if (state) {
      return 'fa-circle-check true-icon';
    }else{
      return 'fa-circle-xmark false-icon';
    }
  }


}
