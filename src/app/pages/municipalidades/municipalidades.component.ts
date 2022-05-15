import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MunicipalidadService } from 'src/app/services/municipalidad.service';
import { Municipalidad } from 'src/app/models/municipalidad.model';

@Component({
  selector: 'app-municipalidades',
  templateUrl: './municipalidades.component.html',
  styleUrls: ['./municipalidades.component.scss']
})
export class MunicipalidadesComponent implements OnInit {

  municipalidades: Municipalidad[] = []
  municipalidad_en_edicion: Municipalidad | undefined = undefined;
  form: FormGroup;


  constructor(private municipalidadesService: MunicipalidadService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      anno: ["", Validators.required],
      canton: ["", Validators.required],
      formaDisposicion: ["", Validators.required],
      gastoServicioRecoleccionResiduos: ["", Validators.required],
      gastosServicioAseoDeVias: ["", Validators.required],
      ingresoServicioRecoleccionRSM: ["", Validators.required],
      lugarDisposicion: ["", Validators.required],
      personasHabitacion: ["", Validators.required],
      ppc: ["", Validators.required],
      programaDeReciclaje: ["", Validators.required],
      provincia: ["", Validators.required],
      recoleccionDeResiduosSolidosValorizables: ["", Validators.required],
      totalIngresoServicioAseoDeVias: ["", Validators.required],
      unidadesHabitacionalesAtendidas: ["", Validators.required],
      unidadesHabitacionalesCanton: ["", Validators.required],

    });
  }

  ngOnInit(): void {
    let getR = this.municipalidadesService.getMunicipalidades().subscribe(res => {
      this.municipalidades = res as Municipalidad[];
      getR.unsubscribe();
      this.municipalidades.sort((a, b) => a.canton.localeCompare(b.canton))

    })
  }

  getColumnas(selected_municipalidad: string): void {

    if (selected_municipalidad == "Ninguno") {
      this.municipalidad_en_edicion = undefined;
    }

    this.municipalidad_en_edicion = this.municipalidades.find(element => element.canton == selected_municipalidad)
    if(this.municipalidad_en_edicion != undefined){
      this.buildForm()
    }
  }


  /**
   * Función que valida si los inputs del form son correctos y los marca como error en caso contrario
   * @returns Si los input son correctos
   */
   validarInput() : boolean {
    if(this.form.invalid){
      Object.values( this.form.controls ).forEach (control =>{
        if (control instanceof FormGroup){
             Object.values(control.controls).forEach (innerControl =>{
              innerControl.markAllAsTouched();
             })
        }else {
          control.markAsTouched();
        }
      })
      return false;
    }else{
      return true;
    }
  }



  /**
   * Función para settear los datos del form en base a la comunidad
   */
  buildForm(): void {
    this.form.controls['anno'].                                    setValue(this.municipalidad_en_edicion!.anno);
    this.form.controls['canton'].                                  setValue(this.municipalidad_en_edicion!.canton);
    this.form.controls['formaDisposicion'].                        setValue(this.municipalidad_en_edicion!.formaDisposicion);
    this.form.controls['gastoServicioRecoleccionResiduos'].        setValue(this.municipalidad_en_edicion!.gastoServicioRecoleccionResiduos);
    this.form.controls['gastosServicioAseoDeVias'].                setValue(this.municipalidad_en_edicion!.gastosServicioAseoDeVias);
    this.form.controls['ingresoServicioRecoleccionRSM'].           setValue(this.municipalidad_en_edicion!.ingresoServicioRecoleccionRSM);
    this.form.controls['lugarDisposicion'].                        setValue(this.municipalidad_en_edicion!.lugarDisposicion);
    this.form.controls['personasHabitacion'].                      setValue(this.municipalidad_en_edicion!.personasHabitacion);
    this.form.controls['ppc'].                                     setValue(this.municipalidad_en_edicion!.ppc);
    this.form.controls['programaDeReciclaje'].                     setValue(this.municipalidad_en_edicion!.programaDeReciclaje);
    this.form.controls['provincia'].                               setValue(this.municipalidad_en_edicion!.provincia);
    this.form.controls['recoleccionDeResiduosSolidosValorizables'].setValue(this.municipalidad_en_edicion!.recoleccionDeResiduosSolidosValorizables);
    this.form.controls['totalIngresoServicioAseoDeVias'].          setValue(this.municipalidad_en_edicion!.totalIngresoServicioAseoDeVias);
    this.form.controls['unidadesHabitacionalesAtendidas'].         setValue(this.municipalidad_en_edicion!.unidadesHabitacionalesAtendidas);
    this.form.controls['unidadesHabitacionalesCanton'].            setValue(this.municipalidad_en_edicion!.unidadesHabitacionalesCanton);
  }


  guardar() {
    if(this.validarInput()){
      
      this.municipalidad_en_edicion!.anno = this.form.value.anno;
      this.municipalidad_en_edicion!.canton = this.form.value.canton;
      this.municipalidad_en_edicion!.formaDisposicion = this.form.value.formaDisposicion;
      this.municipalidad_en_edicion!.gastoServicioRecoleccionResiduos = this.form.value.gastoServicioRecoleccionResiduos;
      this.municipalidad_en_edicion!.gastosServicioAseoDeVias = this.form.value.gastosServicioAseoDeVias;
      this.municipalidad_en_edicion!.ingresoServicioRecoleccionRSM = this.form.value.ingresoServicioRecoleccionRSM;
      this.municipalidad_en_edicion!.lugarDisposicion = this.form.value.lugarDisposicion;
      this.municipalidad_en_edicion!.personasHabitacion = this.form.value.personasHabitacion;
      this.municipalidad_en_edicion!.ppc = this.form.value.ppc;
      this.municipalidad_en_edicion!.programaDeReciclaje = this.form.value.programaDeReciclaje;
      this.municipalidad_en_edicion!.provincia = this.form.value.provincia;
      this.municipalidad_en_edicion!.recoleccionDeResiduosSolidosValorizables = this.form.value.recoleccionDeResiduosSolidosValorizables;
      this.municipalidad_en_edicion!.totalIngresoServicioAseoDeVias = this.form.value.totalIngresoServicioAseoDeVias;
      this.municipalidad_en_edicion!.unidadesHabitacionalesAtendidas = this.form.value.unidadesHabitacionalesAtendidas;
      this.municipalidad_en_edicion!.unidadesHabitacionalesCanton = this.form.value.unidadesHabitacionalesCanton;
       
    }

    this.municipalidadesService.updateMunicipalidad(this.municipalidad_en_edicion!)
    console.log("patata")

  }

  campoInvalido(campo: string) : boolean {
    return this.form.get(campo)!.invalid && this.form.get(campo)!.touched;
  }

  get annoInvalido() {
    return this.campoInvalido("anno");
  }
  get cantonInvalido() {
    return this.campoInvalido("canton");
  }
  get formaDisposicionInvalido() {
    return this.campoInvalido("formaDisposicion");
  }
  get gastoServicioRecoleccionResiduosInvalido() {
    return this.campoInvalido("gastoServicioRecoleccionResiduos");
  }
  get gastosServicioAseoDeViasInvalido() {
    return this.campoInvalido("gastosServicioAseoDeVias");
  }
  get ingresoServicioRecoleccionRSMInvalido() {
    return this.campoInvalido("ingresoServicioRecoleccionRSM");
  }
  get lugarDisposicionInvalido() {
    return this.campoInvalido("lugarDisposicion");
  }
  get personasHabitacionInvalido() {
    return this.campoInvalido("personasHabitacion");
  }
  get ppcInvalido() {
    return this.campoInvalido("ppc");
  }
  get programaDeReciclajeInvalido() {
    return this.campoInvalido("programaDeReciclaje");
  }
  get provinciaInvalido() {
    return this.campoInvalido("provincia");
  }
  get recoleccionDeResiduosSolidosValorizablesInvalido() {
    return this.campoInvalido("recoleccionDeResiduosSolidosValorizables");
  }
  get totalIngresoServicioAseoDeViasInvalido() {
    return this.campoInvalido("totalIngresoServicioAseoDeVias");
  }
  get unidadesHabitacionalesAtendidasInvalido() {
    return this.campoInvalido("unidadesHabitacionalesAtendidas");
  }
  get unidadesHabitacionalesCantonInvalido() {
    return this.campoInvalido("unidadesHabitacionalesCanton");
  }




}
