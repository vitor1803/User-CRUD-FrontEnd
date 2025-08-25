import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { AuthLayout } from './pages/auth-layout/auth-layout';

export const routes: Routes = [
    {
        path: 'login',
        component: AuthLayout,
        data: { mode: 'login' }
    },
    {
        path: 'signup',
        component: AuthLayout,
        data: { mode: 'signup' }
    },
    {
        path: 'edituser/:id',
        component: AuthLayout,
        data: { mode: 'edit' },
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        loadComponent:()=> import('./pages/home/home').then(m => m.Home),
        canActivate: [AuthGuard]
    }, 
    { path: '**', redirectTo: 'login' }
];
