import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { municipalidades } from "../../../assets/data/municipalidades";
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(private popupService: PopupService) { }

  makeCapitalCircleMarkers(map: L.Map): void {

    for (const c of municipalidades) {
      const lon = c.longitud;
      const lat = c.latitud;
      const circle = L.circleMarker([lat, lon]);

      const data = {
        displayName: c.displayName
      }

      circle.bindPopup(this.popupService.makeCapitalPopup(data));
      
      circle.addTo(map);
    }
  }
}
