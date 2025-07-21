import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; //ele usa o ngif e ngfor no html
import { ApiService, Estagiario } from '../../services/api.service'; //comunicação com a api
import { AuthService } from '../../services/auth.service'; //para verificar se é admin
@Component({
  selector: 'app-interns',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './interns.component.html',
  styleUrl: './interns.component.scss',
})
export class InternsComponent implements OnInit {
  public estagiarios: Estagiario[] = []; //vetor para guardar os estagiários

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadInterns();
  }

  loadInterns(): void {
    this.apiService.getEstagiarios().subscribe({
      next: (data: any) => {
        this.estagiarios = data.estagiarios;
        console.log('Dados dos estagiários carregados:', this.estagiarios);
      },
      error: (err) => {
        console.error('Falha ao buscar os dados dos estagiários', err);
      },
    });
  }

  irHome() {
    this.router.navigate(['/home']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  goToRegisterPage(): void {
    this.router.navigate(['/register-intern']);
  }

  editStory(estagiario: Estagiario): void {
    alert('Funcionalidade de edição de história ainda não implementada.');
  }

  deleteStory(estagiario: Estagiario): void {
    alert('Funcionalidade de exclusão de história ainda não implementada.');
  }
}
