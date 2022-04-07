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

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 9.7,-83.9548 ],
      zoom: 8.2
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  
  
  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalCircleMarkers(this.map, this.datos);
  }
}