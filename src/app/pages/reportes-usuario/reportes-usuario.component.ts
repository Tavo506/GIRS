import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reporte } from 'src/app/models/reporte.model';
import { Usuario } from 'src/app/models/usuario.model';
import { ExcelService } from 'src/app/services/excel.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-reportes-usuario',
  templateUrl: './reportes-usuario.component.html',
  styleUrls: ['./reportes-usuario.component.scss']
})
export class ReportesUsuarioComponent implements OnInit {

  idUser!: string;
  usuario!: Usuario;
  reportes!: Reporte[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private reportesService: ReportesService,
    private excelService: ExcelService
  ) {
    // Recupera el id del usuario que se pasa por parámetro
    this.activatedRoute.params.subscribe(params => {
      this.idUser = params['idUser'];
        
      // Teniendo el id se puede buscar el usuario
      this.usuariosService.getUserTavo(this.idUser).subscribe(async res => {
        this.usuario = res as Usuario;

        // this.reportes = 
        this.reportes = await this.reportesService.getReportesPorUsuario(this.usuario.email);
      })
    });

  }
  
  ngOnInit(): void {}


  sendReportToService(document: any): void {
    this.excelService.exportAsExcelFile(document, 'reporte');
  }

  descargarTodo(){
    this.excelService.downloadAll(this.reportes);
  }

}
