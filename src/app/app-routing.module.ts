import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { WelcomeGuard } from './guards/welcome.guard';
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
  {path: "home", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "reportes", component: ReportesComponent},
  {path: "welcome", component: WelcomeComponent, canActivate: [WelcomeGuard]},
  
  {path: "formulario/:idForm", component: FormularioComponent, canActivate: [AuthGuardGuard]},
  {path: "misReportes", component: MisReportesComponent, canActivate: [AuthGuardGuard]},
  {path: "perfil", component: PerfilComponent, canActivate: [AuthGuardGuard]},
  {path: "reportesUsuario/:idUser", component: ReportesUsuarioComponent, canActivate: [AuthGuardGuard]},
  {path: "usuarios", component: UsuariosComponent, canActivate: [AuthGuardGuard]},
  
  {path: "**", pathMatch:"full", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
