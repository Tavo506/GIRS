import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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


  constructor(private localStorage : LocalStorageService, private  userService: UsuariosService) { }

  ngOnInit(): void {
    this.getUserData(this.getUserId);

    this.girsForm = new FormGroup({
      datosGenerales : this.initDatosGenerales(),
      caracteristicasServicio : this.initCaracteristicasServicio(),
      disposicion : this.initDisposicion(),
      aspectosFinancieros : this.initAspectosFinancieros(),
      informacionCalculada : this.initInformacionCalculada()
    });
  }


  initDatosGenerales() : FormGroup{
    return new FormGroup({
      municipalidad: new FormControl(this.userData.municipalidad, [
        Validators.required
      ]),
      telefono: new FormControl(this.userData.telefono, [
        Validators.required
      ]),
      nombreGestor: new FormControl(this.userData.nombre, [
        Validators.required
      ]),
      fecha: new FormControl(this.getTodayDate(), [
        Validators.required
      ]),
      email: new FormControl(this.userData.email, [
        Validators.required
      ]),
      poblacionAtendida: new FormControl(0, [
        Validators.required
      ]),
      cantidadViviendas: new FormControl(0, [
        Validators.required
      ]),
    });
  }

  initCaracteristicasServicio() : FormGroup {
    return new FormGroup({
      porcentajeRecoleccion: new FormControl(0, [
        Validators.required
      ]),
      cantidadMensualDisposicion: new FormControl(0, [
        Validators.required
      ]),
      recoleccionSeparada: new FormControl(false, [
        Validators.required
      ]),
      cantidadMensualRecolectados: new FormControl(0, [
        Validators.required
      ]),
      recoleccionBiodegradables: new FormControl(false, [
        Validators.required
      ]),
      cantidadCamiones: new FormControl(0, [
        Validators.required
      ]),
      rutasRecoleccion: new FormControl(false, [
        Validators.required
      ]),
      mapasRutas: new FormControl(false, [
        Validators.required
      ]),
      cantidadSemanaRecoleccionNoValorizables: new FormControl(0, [
        Validators.required
      ]),
      cantidadSemanaRecoleccionValorizables: new FormControl(0, [
        Validators.required
      ]),
      barridoCalles: new FormControl(false, [
        Validators.required
      ])
    })
  }

  initDisposicion() : FormGroup {
    return new FormGroup({
      tipoLugarDisposicion: new FormControl('', [
        Validators.required
      ]),
      lugarDisposicion: new FormControl('', [
        Validators.required
      ]),
      distanciaPromedioSitio: new FormControl(0, [
        Validators.required
      ]),
      cantidadViajesMes: new FormControl(0, [
        Validators.required
      ]),
      cantidadVolumetricaCamiones: new FormControl(0, [
        Validators.required
      ]),
      cargoUtilCamionViaje: new FormControl(0, [
        Validators.required
      ]),
      quemadoresActivosSitio: new FormControl(false, [
        Validators.required
      ]),
      quemadoresPasivosSitio: new FormControl(false, [
        Validators.required
      ]),
      sitioVertido: new FormControl('', [
        Validators.required
      ]),
      estudioComposicion: new FormControl('false', [
        Validators.required
      ]),
      indiceGeneracion: new FormControl(0, [
        Validators.required
      ]),
      consumoCombustibleCamion: new FormControl(0, [
        Validators.required
      ])
    });
  }

  initAspectosFinancieros() : FormGroup {
    return new FormGroup({
      presupuestoInvertidoGirs: new FormControl(0, [
        Validators.required
      ]),
      presupuestoInvertidoLimpieza: new FormControl(0, [
        Validators.required
      ]),
      porcentajeMorosidad: new FormControl(0, [
        Validators.required
      ]),
      inversionCampanasEducacion: new FormControl(0, [
        Validators.required
      ])
    });
  }

  initInformacionCalculada() : FormGroup {
    return new FormGroup({
      presupuestoInvertido: new FormControl(0, [
        Validators.required
      ]),
      gastoPorVivienda: new FormControl(0, [
        Validators.required
      ]),
      gastoPorAseo: new FormControl(0, [
        Validators.required
      ])
    });
  }

  getTodayDate() {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  //Obtiene el UID del usuarios loggeado del localstorage del browser. 
  get getUserId() : string{
    return JSON.parse(this.localStorage.getLocalStorage("user")).uid;
  }

  //Obtenemos los datos necesarios del usuario para el perfil de la base de datos.
  getUserData(id : string){
    this.userService.getUser(id).then(
      (user : any) => {
        try{
          this.userData.nombre = user.nombre + " " + user.apellido;
          this.userData.municipalidad += user.municipalidad;
          this.userData.telefono = user.telefono;
        }
        catch(e){
          console.log("Hubo un error al cargar el usuario");
        }
      }
    );
  }

  movePage( action : Number ) {
    if (this.actualStep < 7 && action > 0) {
      this.actualStep++;
    }

    if (this.actualStep > 1 && action < 0) {
      this.actualStep--;
    }
  }
}
