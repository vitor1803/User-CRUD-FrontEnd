import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Userservice } from '../services/userservice'; // seu serviço que guarda o token

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: Userservice, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true; // usuário tem token, permite acessar
    } else {
      this.router.navigate(['/login']); // redireciona para login
      return false;
    }
  }
}
