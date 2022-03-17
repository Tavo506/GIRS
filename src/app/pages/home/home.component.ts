import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  municipalidades: {nombre: string, ppc: number, reciclaje: boolean, rsv: boolean}[] = [
    {
      nombre: "Municipalidad Zarcero",
      ppc: 0.53,
      reciclaje: true,
      rsv: false
    },
    {
      nombre: "Municipalidad Naranjo",
      ppc: 0.76,
      reciclaje: false,
      rsv: false
    },
    {
      nombre: "Municipalidad 3",
      ppc: 0.58,
      reciclaje: true,
      rsv: true
    },
    {
      nombre: "Municipalidad 4",
      ppc: 0.91,
      reciclaje: false,
      rsv: true
    }
  ];

  

  ngOnInit(): void {
  }


  /*
   * Funciones sobre el ordenamiento de la tabla
   */

  isSelected(elem: HTMLElement){
    const selected = elem.getAttribute("selected");
    return selected === "true"
  }

  isDesc(elem: HTMLElement){
    const selected = elem.getAttribute("data-order");
    return selected === "desc"
  }

  getSortIcon(): string{
    return "a"
  }

}
