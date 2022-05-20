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
  haySolicitudes = false;

  constructor(private authService: AuthService, private router: Router, private usuariosService: UsuariosService) {

    // Esto es un observer que obtiene la ruta en cada momento
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;       
      }
    });

    this.usuariosService.usuariosEnEspera().then(res => {
      this.haySolicitudes = res;
    })

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

}
