import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: '', 
        loadComponent:()=> import('./pages/auth/auth').then(m => m.Auth)
    },
    {
        path: 'home',
        loadComponent:()=> import('./pages/home/home').then(m => m.Home),
        canActivate: [AuthGuard]
    }
];
