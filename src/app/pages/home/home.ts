import { Component, OnInit } from '@angular/core';
import { Userservice, User } from '../../services/userservice';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  public usuarios: User[] = [];   
  constructor(private userService: Userservice, private router: Router) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.userService.getUsuarios().subscribe({
      next: (data: User[]) => {
        this.usuarios = data;
      }, error: (err) => {
        console.error('Erro ao carregar usuários:', err);
      }
    });
  }

  editarUsuario(id: number) {
    this.router.navigate(['/edituser', id]);
  }
}
