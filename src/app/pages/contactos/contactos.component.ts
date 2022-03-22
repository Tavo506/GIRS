import { Component, OnInit } from '@angular/core';
import { ContactosService } from 'src/app/services/contactos.service';
import { Contacto } from 'src/app/models/contacto.model';
import { getSortIcon} from "src/app/util/sortIcons";

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  //Variables

  contactos : Contacto[] = [];

  constructor(private ContactosService:ContactosService) {

    console.log(ContactosService.getContactos())
  }

  ngOnInit(): void {

    this.ContactosService.getContactos().subscribe(
      datoContacto =>{
        this.contactos = datoContacto as Contacto[];
      }
    );
  }


  getSortIcon(elem: HTMLElement){
    getSortIcon(elem);
  }


}
