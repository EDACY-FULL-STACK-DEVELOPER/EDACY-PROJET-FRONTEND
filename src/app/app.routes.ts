import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { authGuard } from './guards/auth.guard';
import { ListitemComponent } from './items/listitem/listitem.component';
import { CreateitemComponent } from './items/createitem/createitem.component';
import { EdititemComponent } from './items/edititem/edititem.component';
import { DetailitemComponent } from './items/detailitem/detailitem.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'accueil', component: AccueilComponent, canActivate: [authGuard]},

    { path: 'items', component: ListitemComponent, canActivate: [authGuard]},
    { path: 'items/create', component: CreateitemComponent, canActivate: [authGuard]},
    { path: 'items/:id/edit', component: EdititemComponent, canActivate: [authGuard]},
    { path: 'items/:id', component: DetailitemComponent, canActivate: [authGuard]},
];
