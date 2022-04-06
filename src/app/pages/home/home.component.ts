import { Component, OnInit } from '@angular/core';
import { Municipalidad } from 'src/app/models/municipalidad.model';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { getSortIcon} from "src/app/util/sortIcons";
import { sortDate } from "src/app/util/sort";
import { municipalidades as muni } from "../../../assets/data/municipalidades";
import { Reporte } from 'src/app/models/reporte.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  municipalidadesTabla : Municipalidad[] = [];
  municipalidadesMapa : any[] = [];


  constructor(private MunicipalidadService:MunicipalidadService, private reportesService:ReportesService) {}

  getSortIcon(elem: HTMLElement){
    return getSortIcon(elem);
  }

  ngOnInit(): void {

    // Carga los datos de los reportes para el mapa
    this.reportesService.getReportes().subscribe( (data: any[]) => {
      this.municipalidadesMapa = this.getMunicipalidadesParaMapa(data, muni);
      console.log(this.municipalidadesMapa);
      
    })

    // Carga los datos de las municipalidades para la tabla
    this.MunicipalidadService.getMunicipalidades().subscribe( dataMunicipalidad => {
        this.municipalidadesTabla = dataMunicipalidad as Municipalidad[];      
      }
    );
  }


  /**
   * Función para preparar la lista de las municipalidades con su ubicación de Longitud y Latitud, dada la lista de los reportes y la lista de ubicaciones
   * @param reportes Lista de reportes de las municipalidades
   * @param LatLonMunicipalidades Datos de las ubicaciones de las municipalidades
   * @returns Lista con cada municipalidad y su ubicación
   */
  getMunicipalidadesParaMapa(reportes: Reporte[], LatLonMunicipalidades: any[]){
    let ultimosReportes = sortDate(reportes); //Ordena los datos por fecha para que los reportes más recientes estén de primeros
    ultimosReportes = this.getUniqueMuni(ultimosReportes);  //Filtra los datos para obtener un solo reporte por municipalidad
    ultimosReportes = this.joinMunicipalidades(ultimosReportes, LatLonMunicipalidades)
    return ultimosReportes;
  }



  /**
   * Función para eliminar los reportes más antiguos de cada municipalidad para ser utilizados en el mapa
   * @param muni La lista de reportes de las municipalidades
   * @returns Lista con los reportes más nuevos por cada municipalidad
   */
  getUniqueMuni(muni: any[]) : any[] {
    const listaNombres: string[] = [];
    const listaMunis: any[] = [];

    muni.forEach(e => {
      const dato = e["datosGenerales"]["municipalidad"];
      
      if (!listaNombres.includes(dato)) {
        listaNombres.push(dato);
        listaMunis.push(e);
      }
    });

    return listaMunis;
  }


  //TODO Arreglar esto
  joinMunicipalidades(muni: any[], ubicaciones: any[]){
    const r = muni.filter(({ canton: canton1 }) => ubicaciones.every(({ canton: canton2 }) => canton1 !== canton2));
    console.log(r);
    
    const newArr = ubicaciones.concat(r).map((v) => {return {...v, latitud: v.latitud ? v : null, longitud: v.longitud ? v : null}});
    return newArr;
  }




  /**
   * Funciones para iconos de la tabla
   */

  /**
   * Función para determinar qué icono mostrar en base a un estado, retorna el código CSS respectivo
   * @param state El dato que se quiere comprobar si es true, false o nulo
   * @returns Las clases CSS para mostrar el icono correspondiente
   */
  getStateIcon(state: string){
    if (state == "Si") {
      return 'fa-circle-check true-icon';
    }else if (state == "No"){
      return 'fa-circle-xmark false-icon';
    }else{
      return 'fa-circle-minus neutral-icon'
    }
  }


}
