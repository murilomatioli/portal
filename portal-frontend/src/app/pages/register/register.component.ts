import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth.service'; //autenticação

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // Objeto que vai guardar os dados do formulário
  registerData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // evento que é ativado quando clicamos no botao
  onRegister(): void {
    console.log('Tentativa de cadastro com os seguintes dados:', this.registerData);
    alert('Formulário enviado! Verifique o console (F12) para ver os dados capturados.');
  }
  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}