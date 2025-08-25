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


export interface UserLoginDTO {
  email: string;
  password: string;
}


export interface UserListDTO {
  name: string;
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
  
  login(loginData: UserLoginDTO): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginData);
  }
  
  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // ou sessionStorage
  }

  createUsuario(usuario: { name: string, email: string, password: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, usuario);
  }
  
  updateUsuario(id: number, usuario: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, usuario);
  }
  
  getUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getFullUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/full-usuarios`);
  }

  getUsuarioById(id: number): Observable<User>  {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}