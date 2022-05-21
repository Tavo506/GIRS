import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import {Reporte} from 'src/app/models/reporte.model';
import { municipalidades } from 'src/assets/data/municipalidades';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  userData : any = {'nombre' : "Nombre del usuario", 'municipalidad' : "Municipalidad de ", 'telefono' : "Teléfono", 'email' : ""};

  girsForm : FormGroup = new FormGroup({});

  totalSteps: number = 7;

  actualStep: number = 1;

  formID: string;

  reporte : any = {};

  // OPTIONS FOR SELECT

    /**
   * Opciones para la pregunta del tipo de lugar donde se realiza la disposicion
   */
     tipoLugarDisposicionOption: any[] = [
      { value: 'botaderoCieloAbierto', displayName: 'Botadero a cielo abierto' },
      { value: 'vertederoSemiControlado', displayName: 'Vertedero semicontrolado' },
      { value: 'vertederoControlado', displayName: 'Vertedero controlado' },
      { value: 'rellenoSanitario', displayName: 'Relleno sanitario' },
    ]
  
    /**
     * Opciones para la pregunta el sitio vertido es
     */
    sitioVertidoOption: any[] = [
      { value: 'propiedadMunicipal', displayName: 'Propiedad municipal' },
      { value: 'propiedadPrivada', displayName: 'Propiedad privada' },
      { value: 'mixto', displayName: 'Mixto' },
    ]


  constructor(private route: ActivatedRoute, 
              private localStorage : LocalStorageService, 
              private  userService: UsuariosService,
              private reporteService : ReportesService,
              ) { 

    //Debemos crear el FormGroup aunque sea sin datos, ya que el HTML carga más rápido que el async query.
    this.initFormGirs('new');
    this.formID = this.route.snapshot.paramMap.get('idForm') || '';
  }

  ngOnInit(): void {
    //Get de la info del USER Loggeado
    this.userService.getUser(this.getUserId).then(
      (user : any) => {
        try{
          this.initDatosUsuario(user);

          this.initFormGirs(this.formID);
        }
        catch(e){
          console.log("Hubo un error al cargar el usuario");
        }
      }
    )
  }
/**
 * Funcion para inicializar el FormGroup del formulario.
 * @param id ID que pasaron por la ruta. Puede ser solo '' 
 */
  initFormGirs (id : string ) : void {

    if (id=='new'){
      this.girsForm = new FormGroup({
        datosGenerales : this.initDatosGenerales({}),
        caracteristicasServicio : this.initCaracteristicasServicio({}),
        disposicion : this.initDisposicion({}),
        aspectosFinancieros : this.initAspectosFinancieros({}),
        informacionCalculada : this.initInformacionCalculada({})
      });
    }
    else{
      this.reporteService.getReporte(id).then(
        (reporte : any) => {
          console.log(reporte);
          this.reporte = reporte;
          this.girsForm = new FormGroup({
            datosGenerales : this.initDatosGenerales(reporte.datosGenerales),
            caracteristicasServicio : this.initCaracteristicasServicio(reporte.caracteristicasServicio),
            disposicion : this.initDisposicion(reporte.disposicion),
            aspectosFinancieros : this.initAspectosFinancieros(reporte.aspectosFinancieros),
            informacionCalculada : this.initInformacionCalculada(reporte.informacionCalculada)
          });

        }
      );
    }
  }


  initDatosUsuario( user : any ) : void {
    this.userData.nombre = user.nombre + " " + user.apellido;
    this.userData.municipalidad += user.municipalidad;
    this.userData.telefono = user.telefono;
    this.userData.email = user.email;
  }

  initDatosGenerales(data : any) : FormGroup{

    data.poblacionAtendida = this.parseNumber(data.poblacionAtendida);

    data.cantidadViviendas = this.parseNumber(data.cantidadViviendas);

    return new FormGroup({
      municipalidad: new FormControl(data.municipalidad || '', [
        Validators.required
      ]),
      telefono: new FormControl(data.telefono || '', [
        Validators.required
      ]),
      nombreGestor: new FormControl(data.nombreGestor || '', [
        Validators.required
      ]),
      fecha: new FormControl(this.getTodayDate(), [
        Validators.required
      ]),
      email: new FormControl(data.email || '', [
        Validators.required
      ]),
      poblacionAtendida: new FormControl( data.poblacionAtendida || '0', [
        Validators.required
      ]),
      cantidadViviendas: new FormControl( data.cantidadViviendas || '0', [
        Validators.required
      ]),
    });
  }

  initCaracteristicasServicio(data : any) : FormGroup {

    data.porcentajeRecoleccion = this.parseNumber(data.porcentajeRecoleccion);

    data.cantidadMensualDisposicion = this.parseNumber(data.cantidadMensualDisposicion);

    data.cantidadMensualRecolectados = this.parseNumber(data.cantidadMensualRecolectados);

    data.cantidadCamiones = this.parseNumber(data.cantidadCamiones);

    data.cantidadSemanaRecoleccionNoValorizables = this.parseNumber(data.cantidadSemanaRecoleccionNoValorizables);

    data.cantidadSemanaRecoleccionValorizables = this.parseNumber(data.cantidadSemanaRecoleccionValorizables);

    return new FormGroup({
      porcentajeRecoleccion: new FormControl(data.porcentajeRecoleccion || 0, [
        Validators.required
      ]),
      cantidadMensualDisposicion: new FormControl(data.cantidadMensualDisposicion || 0, [
        Validators.required
      ]),
      recoleccionSeparada: new FormControl(data.recoleccionSeparada || false, [
        Validators.required
      ]),
      cantidadMensualRecolectados: new FormControl(data.cantidadMensualRecolectados || 0, [
        Validators.required
      ]),
      recoleccionBiodegradables: new FormControl(data.recoleccionBiodegradables || false, [
        Validators.required
      ]),
      cantidadCamiones: new FormControl(data.cantidadCamiones || 0, [
        Validators.required
      ]),
      rutasRecoleccion: new FormControl(data.rutasRecoleccion || false, [
        Validators.required
      ]),
      mapasRutas: new FormControl(data.mapasRutas || false, [
        Validators.required
      ]),
      cantidadSemanaRecoleccionNoValorizables: new FormControl(data.cantidadSemanaRecoleccionNoValorizables || 0, [
        Validators.required
      ]),
      cantidadSemanaRecoleccionValorizables: new FormControl(data.cantidadSemanaRecoleccionValorizables || 0, [
        Validators.required
      ]),
      barridoCalles: new FormControl(data.barridoCalles || false, [
        Validators.required
      ])
    })
  }

  initDisposicion(data : any) : FormGroup {

    data.distanciaPromedioSitio = this.parseNumber(data.distanciaPromedioSitio);

    data.cantidadViajesMes = this.parseNumber(data.cantidadViajesMes);

    data.cantidadVolumetricaCamiones = this.parseNumber(data.cantidadVolumetricaCamiones);

    data.cargoUtilCamionViaje = this.parseNumber(data.cargoUtilCamionViaje);

    data.indiceGeneracion = this.parseNumber(data.indiceGeneracion);

    data.consumoCombustibleCamion = this.parseNumber(data.consumoCombustibleCamion);

    return new FormGroup({
      tipoLugarDisposicion: new FormControl(data.tipoLugarDisposicion || '', [
        Validators.required
      ]),
      lugarDisposicion: new FormControl(data.lugarDisposicion || '', [
        Validators.required
      ]),
      distanciaPromedioSitio: new FormControl(data.distanciaPromedioSitio || 0, [
        Validators.required
      ]),
      cantidadViajesMes: new FormControl(data.cantidadViajesMes || 0, [
        Validators.required
      ]),
      cantidadVolumetricaCamiones: new FormControl(data.cantidadVolumetricaCamiones || 0, [
        Validators.required
      ]),
      cargoUtilCamionViaje: new FormControl(data.cargoUtilCamionViaje || 0, [
        Validators.required
      ]),
      quemadoresActivosSitio: new FormControl(data.quemadoresActivosSitio || false, [
        Validators.required
      ]),
      quemadoresPasivosSitio: new FormControl(data.quemadoresPasivosSitio || false, [
        Validators.required
      ]),
      sitioVertido: new FormControl(data.sitioVertido || '', [
        Validators.required
      ]),
      estudioComposicion: new FormControl(data.estudioComposicion || 'false', [
        Validators.required
      ]),
      indiceGeneracion: new FormControl(data.indiceGeneracion || 0, [
        Validators.required
      ]),
      consumoCombustibleCamion: new FormControl(data.consumoCombustibleCamion || 0, [
        Validators.required
      ])
    });
  }

  initAspectosFinancieros(data : any) : FormGroup {

    data.presupuestoInvertidoGirs = this.parseNumber(data.presupuestoInvertidoGirs);

    data.presupuestoInvertidoLimpieza = this.parseNumber(data.presupuestoInvertidoLimpieza);

    data.porcentajeMorosidad = this.parseNumber(data.porcentajeMorosidad);

    data.inversionCampanasEducacion = this.parseNumber(data.inversionCampanasEducacion);

    return new FormGroup({
      presupuestoInvertidoGirs: new FormControl(data.presupuestoInvertidoGirs || 0, [
        Validators.required
      ]),
      presupuestoInvertidoLimpieza: new FormControl(data.presupuestoInvertidoLimpieza || 0, [
        Validators.required
      ]),
      porcentajeMorosidad: new FormControl(data.porcentajeMorosidad || 0, [
        Validators.required
      ]),
      inversionCampanasEducacion: new FormControl(data.inversionCampanasEducacion || 0, [
        Validators.required
      ])
    });
  }

  initInformacionCalculada(data : any) : FormGroup {

    data.indiceGeneracion = this.parseNumber(data.indiceGeneracion);

    data.gastoPorVivienda = this.parseNumber(data.gastoPorVivienda);

    data.gastoPorAseo = this.parseNumber(data.gastoPorAseo);

    return new FormGroup({
      indiceGeneracion: new FormControl(data.indiceGeneracion || 0, [
        Validators.required
      ]),
      gastoPorVivienda: new FormControl(data.gastoPorVivienda || 0, [
        Validators.required
      ]),
      gastoPorAseo: new FormControl(data.gastoPorAseo || 0, [
        Validators.required
      ])
    });
  }


  //Save Form
  updateForm(){

    // Ventana de confirmación para eliminar el contacto
    Swal.fire({
      title: "Guardar formulario",
      icon: "warning",
      text: "El formulario se va a guardar. Presione 'Completado', si considera que el formular está completo. En caso que no, presione 'Incompleto'",
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Completado",
      denyButtonText: "Incompleto",

    }).then((result) => { 
      //Presionó "Cancelar"
      if(result.isDismissed){
        return
      }

      let json = this.girsForm.getRawValue();

      this.reporte.datosGenerales = json.datosGenerales;
      this.reporte.caracteristicasServicio = json.caracteristicasServicio;
      this.reporte.disposicion = json.disposicion;
      this.reporte.aspectosFinancieros = json.aspectosFinancieros;
      this.reporte.informacionCalculada = json.informacionCalculada;
      this.reporte.fechaModificacion =   this.getTodayDate();

      //Form Completo
      if(result.isConfirmed){
        this.reporte.completado = true;
      }
      //Form Incompleto
      if(result.isDenied){
        this.reporte.completado = false;
      }

      //Si hay que crear el form o actualizarlo
      if ( this.formID == "new" ){
        this.reporte.anno = this.reporte.fechaModificacion.split('-')[0];
        this.reporte.canton = this.userData.municipalidad.split(' ')[2];
        this.reporte.provincia = this.provinciaOfCanton(this.reporte.canton);
        this.reporteService.insertReporte(this.reporte as Reporte);
      }
      else{
        console.log(this.reporteService.updateReporte(this.formID, this.reporte as Reporte));
      }
    });
  }

  //Obtiene la fecha de hoy
  getTodayDate() {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  //Obtiene el UID del usuarios loggeado del localstorage del browser. 
  get getUserId() : string{
    return JSON.parse(this.localStorage.getLocalStorage("user")).uid;
  }

  provinciaOfCanton(canton : string) {
    for ( let i=0; i < municipalidades.length; i++){

      if ( municipalidades[i].canton == canton ){
        return municipalidades[i].province;
      }

    }
  }

//String to int parser
  parseNumber(number : any) {
    if ( number != '' && number != undefined){
      return Number(number.toString().replace(' ', '').replace(',','.'));
    }
    else{
      return number
    }
  }

//Cambiar de página. Recibe 1 o -1 . 
  movePage( action : Number ) {
    if (this.actualStep < 7 && action > 0) {
      this.actualStep++;
    }

    if (this.actualStep > 1 && action < 0) {
      this.actualStep--;
    }
  }
}

//https://ng-bootstrap.github.io/#/components/modal/examples