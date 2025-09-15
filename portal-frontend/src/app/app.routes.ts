import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { InternsComponent } from './pages/interns/interns.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterInternComponent } from './pages/register-intern/register-intern.component';
import { adminGuard } from './guards/admin.guard';
import { ApresentacaoComponent } from './pages/apresentacao/apresentacao';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'interns', component: InternsComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'apresentacao', component: ApresentacaoComponent},
  {
    path: 'register-intern',
    component: RegisterInternComponent,
    canActivate: [adminGuard],
  }, // guardian para proteger a rota
  //rotas de redirecionamento
  { path: '', redirectTo: 'apresentacao', pathMatch: 'full' }, //rota padrão
  { path: '**', redirectTo: 'apresentacao' }, //rota coringa
];
