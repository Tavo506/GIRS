import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './pages/calculadora/calculadora.component';
import { ComparativasComponent } from './pages/comparativas/comparativas.component';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { FormularioComponent } from './pages/formulario/formulario.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MisReportesComponent } from './pages/mis-reportes/mis-reportes.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReportesUsuarioComponent } from './pages/reportes-usuario/reportes-usuario.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {path: "calculadora", component: CalculadoraComponent},
  {path: "comparativas", component: ComparativasComponent},
  {path: "contactos", component: ContactosComponent},
  {path: "formulario", component: FormularioComponent},
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "misReportes", component: MisReportesComponent},
  {path: "perfil", component: PerfilComponent},
  {path: "register", component: RegisterComponent},
  {path: "reportes", component: ReportesComponent},
  {path: "reportesUsuario", component: ReportesUsuarioComponent},
  {path: "usuarios", component: UsuariosComponent},
  {path: "welcome", component: WelcomeComponent},
  
  {path: "**", pathMatch:"full", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
