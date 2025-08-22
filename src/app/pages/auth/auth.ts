import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Userservice, User, LoginDTO } from '../../services/userservice'; 


@Component({
  selector: 'app-auth',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth implements OnInit{
  form!: FormGroup;
  isLoginMode = true;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: Userservice
  ){}
  ngOnInit(): void {
    this.setupForm();
  }

  setupForm():void{
    this.form = this.fb.group({
      name:[''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  toggleMode():void{
    this.isLoginMode = ! this.isLoginMode;
  }

  getUsuarios(): User[]{
    const dados= localStorage.getItem('usuarios');
    return dados? JSON.parse(dados) : [];
  }

  salvarUsuarios(lista: User[]):void{
    localStorage.setItem('usuarios', JSON.stringify(lista))
  }

  onSubmit(): void{
    if(this.form.invalid){
      console.log('Form invalido', this.form.errors);
      return;
    }

    const { name, email, password } = this.form.value;


    if(this.isLoginMode){
      const loginData: LoginDTO = { email, password };
      this.userService.login(loginData).subscribe({
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
    } else {
      const novoUsuario = { name, email, password };
      console.log('Novo usuário enviado:', novoUsuario);
      this.userService.createUsuario(novoUsuario).subscribe({
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
    }
  }
}
