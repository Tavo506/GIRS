import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get isLoggedIn(): boolean{
    return false;
    return true;
  }

  // Para manejar si mostrar o no la campana de notificaciones
  get haySolicitudes(): boolean{
    return false;
    return true;
  }

}
