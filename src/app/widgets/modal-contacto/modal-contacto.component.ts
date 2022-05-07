import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Contacto } from 'src/app/models/contacto.model';


@Component({
  selector: 'app-modal-contacto',
  templateUrl: './modal-contacto.component.html',
  styleUrls: ['./modal-contacto.component.scss']
})
export class ModalContacto implements OnInit {

  titulo: string = "";
  accion!: "Guardar" | "Editar";
  contacto!: Contacto;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ["", Validators.required],
      apellido_1: ["", Validators.required],
      apellido_2: [""],
      telefono: ["", [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
      correo: ["", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
    });

  }

  ngOnInit(): void {
  }


  /**
   * Función para settear los datos del form en base al contacto
   */
  buildForm(): void {
    this.form.controls['nombre'].setValue(this.contacto.nombre);
    this.form.controls['apellido_1'].setValue(this.contacto.apellido_1);
    this.form.controls['apellido_2'].setValue(this.contacto.apellido_2);
    this.form.controls['telefono'].setValue(this.contacto.telefono);
    this.form.controls['correo'].setValue(this.contacto.correo);
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
   * Función que guarda los datos del form en la base de datos o los actualiza
   */
  guardar() {
    if(this.validarInput()){
      
      this.contacto.nombre = this.form.value.nombre;
      this.contacto.apellido_1 = this.form.value.apellido_1;
      this.contacto.apellido_2 = this.form.value.apellido_2;
      this.contacto.telefono = this.form.value.telefono;
      this.contacto.correo = this.form.value.correo;
      
      this.activeModal.close({status: "OK", value: this.contacto})
       
    }
  }



  // ###################################
  // #     Gets de inputs invalidos    #
  // ###################################

  campoInvalido(campo: string) : boolean {
    return this.form.get(campo)!.invalid && this.form.get(campo)!.touched ;
  }

  get nombreInvalido() {
    return this.campoInvalido("nombre");
  }

  get apellido_1Invalido() {
    return this.campoInvalido("apellido_1");
  }

  get telefonoInvalido() {
    return this.campoInvalido("telefono");
  }
  
  get correoInvalido() {
    return this.campoInvalido("correo");
  }


}
