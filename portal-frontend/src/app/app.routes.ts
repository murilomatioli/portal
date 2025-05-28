import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { InternsComponent } from './pages/interns/interns.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'interns', component: InternsComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full' }, //rota padrão
    {path: '**', redirectTo: 'login'} //rota coringa
];
