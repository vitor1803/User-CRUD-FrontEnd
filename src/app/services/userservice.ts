import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  ativo?: boolean;
}


export interface LoginDTO {
  email: string;
  password: string;
}


export interface UserListDTO {
  nome: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  usuario: User;
}


@Injectable({
  providedIn: 'root'
})
export class Userservice {
  private apiUrl = 'http://localhost:5037/usuarios';

  constructor(private http: HttpClient) {}
  
  createUsuario(usuario: { name: string, email: string, password: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, usuario);
  }

  login(loginData: LoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData);
  }

  getUsuarios(): Observable<UserListDTO[]> {
    return this.http.get<UserListDTO[]>(`${this.apiUrl}`);
  }

  getFullUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/full-usuarios`);
  }
}