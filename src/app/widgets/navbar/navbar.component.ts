import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public currentRoute = "/";

  constructor(private authService: AuthService, private router: Router, private usuariosService: UsuariosService) {

    // Esto es un observer que obtiene la ruta en cada momento
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;       
      }
    });

  }


  ngOnInit(): void {
  }

  get showNav(): boolean {
    return this.currentRoute !== "/welcome";
  }

  logOut(): void {
    this.authService.logOut();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }


  // Para manejar si mostrar o no la campana de notificaciones
  async haySolicitudes() {
    
    
    return await this.usuariosService.usuariosEnEspera()
  }

}
