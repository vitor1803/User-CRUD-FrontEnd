import { Component, OnInit } from '@angular/core';
import { Userservice, User } from '../../services/userservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  public usuarios: User[] = [];   
  constructor(private userService: Userservice) {}

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
}
