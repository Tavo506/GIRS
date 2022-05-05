import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-contacto',
  templateUrl: './modal-contacto.component.html',
  styleUrls: ['./modal-contacto.component.scss']
})
export class ModalContactoComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  

}
