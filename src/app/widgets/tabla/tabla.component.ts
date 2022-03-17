import { Component, Input, OnInit } from '@angular/core';
import { TableBuilder, TableColumn } from 'src/app/builders/TableBuilder';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  constructor() { }

  @Input() builder!: TableBuilder;  // El builder de la tabla para obtener los datos
  datos?: any[];  // Los datos a mostrar en la tabla
  columnas?: TableColumn[]; // Las columnas de la tabla

  ngOnInit(): void {
    this.getTable(this.builder);
  }


  /**
   * Función que obtiene todos los datos del builder para cargarlos
   * @param builder 
   */
  getTable(builder: TableBuilder){
    
    this.datos = builder.getData();
    console.log(this.datos);
    this.columnas = builder.getColumns();
  }

}
