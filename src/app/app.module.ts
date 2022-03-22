import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { ComparativasComponent } from './pages/comparativas/comparativas.component';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { ReportesUsuarioComponent } from './pages/reportes-usuario/reportes-usuario.component';
import { MisReportesComponent } from './pages/mis-reportes/mis-reportes.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NavbarComponent } from './widgets/navbar/navbar.component';
import { MdbCollapseModule } from "mdb-angular-ui-kit/collapse";
import { MdbDropdownModule } from "mdb-angular-ui-kit/dropdown";
import { SortDirective } from './directives/sort.directive';
//import { NavbarAdminComponent } from './widgets/navbar-admin/navbar-admin.component';
import { environment } from 'src/environments/environment';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ReportesComponent,
    ComparativasComponent,
    CalculadoraComponent,
    ContactosComponent,
    WelcomeComponent,
    UsuariosComponent,
    FormularioComponent,
    ReportesUsuarioComponent,
    MisReportesComponent,
    PerfilComponent,
    NavbarComponent,
    SortDirective
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MdbCollapseModule,
    MdbDropdownModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(fasStar, farStar);
  }

 }
