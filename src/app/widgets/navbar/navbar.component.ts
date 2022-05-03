import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public currentRoute = "/";

  constructor(private authService: AuthService, private router: Router) {

    // Esto es un observer que obtiene la ruta en cada momento
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log(this.currentRoute);
        
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
  get haySolicitudes(): boolean {
    return false;
    return true;
  }

}
