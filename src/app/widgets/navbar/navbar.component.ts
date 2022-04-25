import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logOut();
  }

  get isLoggedIn(): boolean{
    return this.authService.isLoggedIn;
  }

  // Para manejar si mostrar o no la campana de notificaciones
  get haySolicitudes(): boolean{
    return false;
    return true;
  }

}
