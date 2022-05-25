import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.scss']
})
export class ModalPerfil implements OnInit {

  usuario!: Usuario;
  form: FormGroup;

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      telefono: ["", [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit(): void {
  }


  /**
   * Función para settear los datos del form en base al contacto
   */
  buildForm(): void {
    this.form.controls['nombre'].setValue(this.usuario.nombre);
    this.form.controls['apellido'].setValue(this.usuario.apellido);
    this.form.controls['telefono'].setValue(this.usuario.telefono);
  }

  /**
 * Función que valida si los inputs del form son correctos y los marca como error en caso contrario
 * @returns Si los input son correctos
 */
  validarInput(): boolean {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(innerControl => {
            innerControl.markAllAsTouched();
          })
        } else {
          control.markAsTouched();
        }
      })
      return false;
    } else {
      return true;
    }
  }

  /**
 * Función que guarda los datos del form en la base de datos o los actualiza
 */
  guardar() {
    if (this.validarInput()) {

      this.usuario.nombre = this.form.value.nombre;
      this.usuario.apellido = this.form.value.apellido;
      this.usuario.telefono = this.form.value.telefono;

      this.activeModal.close({ status: "OK", value: this.usuario })

    }
  }

  // ###################################
  // #     Gets de inputs invalidos    #
  // ###################################

  campoInvalido(campo: string): boolean {
    return this.form.get(campo)!.invalid && this.form.get(campo)!.touched;
  }

  get nombreInvalido() {
    return this.campoInvalido("nombre");
  }

  get apellidoInvalido() {
    return this.campoInvalido("apellido");
  }

  get telefonoInvalido() {
    return this.campoInvalido("telefono");
  }

}
