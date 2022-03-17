import { Component, OnInit } from '@angular/core';
import { TableBuilder } from 'src/app/builders/TableBuilder';

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

  tableBuilder!: TableBuilder;
  builderReady: boolean = false;

  prepararDatosDeTabla(): void {

    this.tableBuilder = new TableBuilder(this.municipalidades, [
      {
        name: "nombre",
        sortable: true,
      },
      {
        name: "PPC",
        sortable: true,
      },
      {
        name: "Programa de reciclaje",
        sortable: true,
      },
      {
        name: "Recolección de residuos sólidos valorizables",
        sortable: true,
      }
    ])
    .setTrueFalseColumn(2)
    .setTrueFalseColumn(3)
    .setYesNoButton((item: any) => {console.log(item.nombre)}, () => {console.log("No")}, "Aceptar/Rechazar")
    this.builderReady = true;
  }


  ngOnInit(): void {
    this.prepararDatosDeTabla();
  }

}
