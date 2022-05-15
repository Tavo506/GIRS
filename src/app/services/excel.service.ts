import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any, excelFileName: string): void {
    delete json["$key"];
    
    json = { ...json }                                                        //Clonar JSON para no afectar los datos originales
    var objectWorkSheets = this.spliceJson(json);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([json]);       //Se crea la hoja de trabajo principal
    var resultObject = { 'Informacion General': worksheet }                   //Se establece el parametro que enviar al archivo excel (conjunto de hojas de trabajo)

    for (var i = 0; i < objectWorkSheets['resultado'].length; i++) {           //Se recolectan las hojas de trabajo, y se juntan en el parametro anterior
      var key = objectWorkSheets['nombres'][i]
      var tempObj = Object.create({});
      tempObj[key] = objectWorkSheets['resultado'][i]
      Object.assign(resultObject, tempObj);
    }
    objectWorkSheets['nombres'].unshift('Informacion General')                //Se agrega a la lista de nombre la hoja de trabajo principal
    const workbook: XLSX.WorkBook = { Sheets: resultObject, SheetNames: objectWorkSheets['nombres'] };    //Se crea el excel, los parametros corresponden a cada una de las hojas de trabajo en un objeto y cada uno de los nombres correspondientes a esas hojas de trabajo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);                         //Se guarda el archivo en el PC
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '__' + new Date().getTime() + EXCEL_EXTENSION);
  }

  private createWorkSheet(json: any): XLSX.WorkSheet {                       //Esta funcion crea una hoja de trabajo en funcion de un json enviado
    json = { ...json }
    json = json[0]
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([json]);
    return worksheet
  }

  private spliceJson(json: any): any {                                      //Esta funcion busca esos espacios en el json que tienen mas de un nivel
    var res = []
    var names = []
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        if (typeof json[key] === 'object') {                                 //Identifica que es un Object por ende tiene mas de un nivel
          var wk = this.createWorkSheet([json[key]]);
          res.push(wk);                                                       //Se agrega la hoja de trabajo al valor de retorno
          names.push(key);                                                    //Se agrega el nombre de la hoja de retorno
          this.deleteAttJson(json, key);                                      //Se borro del json principal la propiedad que se separo en una hoja de trabajo independiente
        }
      }
    }
    return { 'resultado': res, 'nombres': names }
  }

  private deleteAttJson(json: any, attribute: string) {
    delete json[attribute];
  }

}