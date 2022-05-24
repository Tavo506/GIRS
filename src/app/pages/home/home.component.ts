import { Component, OnInit } from '@angular/core';
import { Municipalidad } from 'src/app/models/municipalidad.model';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { getSortIcon} from "src/app/util/sortIcons";
import { sortJson } from "src/app/util/sort";
import { municipalidades as muni } from "../../../assets/data/municipalidades";
import { Reporte } from 'src/app/models/reporte.model';
import { MuniMapa } from 'src/app/models/muniMapa.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  municipalidadesTabla : Municipalidad[] = [];
  municipalidadesMapa! : MuniMapa[];


  constructor(private MunicipalidadService:MunicipalidadService, private reportesService:ReportesService) {}

  getSortIcon(elem: HTMLElement){
    return getSortIcon(elem);
  }

  ngOnInit(): void {

    // Carga los datos de los reportes para el mapa
    this.reportesService.getReportes().subscribe( (data: any[]) => {
      
      // Línea para mostrar reportes que no cumplen con la estructura definida
      // console.warn(data.filter(e => !e.canton));
      
      this.municipalidadesMapa = this.getMunicipalidadesParaMapa(data, muni);     
    })

    // Carga los datos de las municipalidades para la tabla
    this.MunicipalidadService.getMunicipalidades().subscribe( dataMunicipalidad => {
        this.municipalidadesTabla = dataMunicipalidad as Municipalidad[];      
      }
    );
  }


  /**
   * Función para preparar la lista de las municipalidades con su ubicación de Longitud y Latitud, 
   * dada la lista de los reportes y la lista de ubicaciones
   * @param reportes Lista de reportes de las municipalidades
   * @param LatLonMunicipalidades Datos de las ubicaciones de las municipalidades
   * @returns Lista con cada municipalidad y su ubicación
   */
  getMunicipalidadesParaMapa(reportes: Reporte[], LatLonMunicipalidades: MuniMapa[]){
    let ultimosReportes = sortJson(reportes, "anno"); //Ordena los datos por fecha para que los reportes más recientes estén de primeros
    ultimosReportes = this.getUniqueMuni(ultimosReportes);  //Filtra los datos para obtener un solo reporte por municipalidad
    let municipalidadesConUbicacion = this.joinMunicipalidades(ultimosReportes, LatLonMunicipalidades) //Une las municipalidades con su ubicación en el mapa
    municipalidadesConUbicacion = sortJson(municipalidadesConUbicacion, "displayName", -1); //Vuelve a ordenar los datos en orden alfabético
    return municipalidadesConUbicacion;
  }



  /**
   * Función para eliminar los reportes más antiguos de cada municipalidad para ser utilizados en el mapa
   * @param muni La lista de reportes de las municipalidades
   * @returns Lista con los reportes más nuevos por cada municipalidad
   */
  getUniqueMuni(muni: Reporte[]) : Reporte[] {
    const listaNombres: string[] = [];
    const listaMunis: Reporte[] = [];

    muni.forEach(e => {
      const dato = e.canton;
      
      if (!listaNombres.includes(dato)) {
        listaNombres.push(dato);
        listaMunis.push(e);
      }
    });

    return listaMunis;
  }


  /**
   * Función para realizar un join a los reportes y las ubicaciones,
   * para que así cada punto en el mapa muestre información del último reporte registrado
   * @param reportes Lista de reportes con los reportes ya únicos por municipalidad
   * @param ubicaciones Lista de ubicaciones
   * @returns Una sola lista convinada (join)
   */
  joinMunicipalidades(reportes: Reporte[], ubicaciones: MuniMapa[]){
    
    // IMPORTANTE: Para debbuging, estas líneas es para ver en consola los reportes que no coincidieron con una ubicación !!!!
    // const r = reportes.filter(({ canton: canton1 }) => ubicaciones.every(({ canton: canton2 }) => canton1 !== canton2));
    // console.log(r);
    
    const newArr = ubicaciones.map(u => {
      const muni:Reporte = reportes.filter(m => m.canton === u.canton)[0];
      return {
        ...u,
        viviendas: muni ? muni.datosGenerales.cantidadViviendas : "NA",
        generacion: muni ? muni.informacionCalculada.indiceGeneracion : "NA",
        anno: muni ? muni.anno : "NA"
      }
    })
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
