import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    return `` +
      `<b>${ data.displayName }</b>` +
      `<div>Cantidad de viviendas : ${ data.viviendas }</div>` +
      `<div>Índice de generación : ${ data.generacion }</div>` +
      `<div>Año : ${ data.anno }</div>`
  }
}
