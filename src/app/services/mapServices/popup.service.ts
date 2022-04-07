import { Injectable } from '@angular/core';
import { MuniMapa } from 'src/app/models/muniMapa.model';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: MuniMapa): string {
    return `` +
      `<b>${ data.displayName }</b>` +
      `<div>Cantidad de viviendas : ${ data.viviendas }</div>` +
      `<div>Índice de generación : ${ data.generacion }</div>` +
      `<div>Año : ${ data.anno }</div>`
  }
}
