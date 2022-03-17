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
      ppc: 0.53,
      reciclaje: false,
      rsv: false
    },
    {
      nombre: "Municipalidad 3",
      ppc: 0.53,
      reciclaje: true,
      rsv: true
    },
    {
      nombre: "Municipalidad 4",
      ppc: 0.53,
      reciclaje: false,
      rsv: true
    }
  ];

  

  ngOnInit(): void {
  }

}
