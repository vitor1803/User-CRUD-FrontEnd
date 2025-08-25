import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, Router } from '@angular/router';
import { UserLoginDTO, Userservice, User } from '../../services/userservice';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css'
})
export class AuthLayout {
  @Input() mode: 'login' | 'signup' | 'edit' = 'login'; 
  form: FormGroup;
  userId?: number;


  constructor(private fb: FormBuilder, private activedRoute: ActivatedRoute, private router: Router, private auth: Userservice ) {
    this.form = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    this.activedRoute.data.subscribe(data => {
      this.mode = data['mode'] || 'login';
    });
    if (this.mode === 'edit') {
      this.activedRoute.params.subscribe(params => {
        this.userId = +params['id'];
        this.loadUser(this.userId);
      });
    }
  }

  loadUser(id: number) {
    this.auth.getUsuarioById(id).subscribe({
      next: (user: User) => {
        this.form.patchValue({
          name: user.name,
          email: user.email,
          password: '' 
        });
      },
      error: err => console.error('Erro ao carregar usuário', err)
    });
  }

  onSubmit() {
    const { name, email, password } = this.form.value;

    if (this.mode === 'login') {
      const loginData: UserLoginDTO = { email, password };
      this.auth.login(loginData).subscribe({
        next: (res) => {
          console.log('Login bem sucedido!', res);
          localStorage.setItem('token', res.token); // salva o JWT
          localStorage.setItem('usuarioLogado', JSON.stringify(res.usuario));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          alert('Email ou senha inválidos!');
        }
      });

    } else if (this.mode === 'signup') {
      const novoUsuario = { name, email, password };
      console.log('Novo usuário enviado:', novoUsuario);
      this.auth.createUsuario(novoUsuario).subscribe({
        next: () => {
          alert('Cadastro criado com sucesso!');
          this.toggleMode();
          this.form.reset();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao criar usuário!');
        }
      });
    } else {
      this.auth.updateUsuario(this.userId!, { name, email, password }).subscribe({
        next: () => {
          alert('Usuário atualizado com sucesso!');
          this.router.navigate(['/home']); // volta para a lista
        },
        error: err => alert('Erro ao atualizar usuário!')
      });
    }
  }
  toggleMode() {
    this.mode = this.mode === 'login' ? 'signup' : 'login';
  }
}
