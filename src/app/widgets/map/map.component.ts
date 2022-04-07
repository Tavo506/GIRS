import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { MuniMapa } from 'src/app/models/muniMapa.model';
import { MarkerService } from 'src/app/services/mapServices/marker.service';


// Fix para los íconos del mapa
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

//Tutorial: https://www.digitalocean.com/community/tutorials/angular-angular-and-leaflet
export class MapComponent implements AfterViewInit {

  @Input() datos! : MuniMapa[];

  // Variable que contiene el mapa
  private map!: L.Map;
  private ubicacionCR = {latitud: 9.7, longitud: -83.9548, zoom: 8.2}
  private zoomMunicipalidad = 15;
  private zoomAnimationOptions: L.ZoomPanOptions = {animate: true, duration: 1}

  private initMap(): void {

    // Creación del mapa, se le asigna el centro y el zoom inicial
    this.map = L.map('map', {
      center: [ this.ubicacionCR.latitud, this.ubicacionCR.longitud ],
      zoom: this.ubicacionCR.zoom
    });

    // Se le asigna la imagen de mapa
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  

  /**
   * Función para moverse en el mapa según el filtro de municipalidades
   * @param seleccion Opción marcada en el select
   */
  goToMuni(seleccion: string): void {
    if (seleccion === "CR") {
      this.map.setView([ this.ubicacionCR.latitud, this.ubicacionCR.longitud ], this.ubicacionCR.zoom, this.zoomAnimationOptions);
    }else{
      const municipalidad = this.datos.filter(e => e.canton == seleccion)[0];
      this.map.setView([ municipalidad.latitud, municipalidad.longitud ], this.zoomMunicipalidad, this.zoomAnimationOptions);
    }
    
  }

  
  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalCircleMarkers(this.map, this.datos);
  }
}