import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    MdbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
