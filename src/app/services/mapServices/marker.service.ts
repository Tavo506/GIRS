import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { MuniMapa } from 'src/app/models/muniMapa.model';
import { municipalidades } from "../../../assets/data/municipalidades";
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private popupService: PopupService) { }

  makeCapitalCircleMarkers(map: L.Map, datos: MuniMapa[]): void {

    for (const c of datos) {
      const lon = c.longitud;
      const lat = c.latitud;
      const circle = L.circleMarker([lat, lon], {color: 'red', fillColor: '#f03', fillOpacity: 0.5});


      circle.bindPopup(this.popupService.makeCapitalPopup(c));
      
      circle.addTo(map);
    }
  }
}
