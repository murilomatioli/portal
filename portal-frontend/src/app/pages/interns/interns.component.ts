import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; //ele usa o ngif e ngfor no html
import { ApiService, Estagiario } from '../../services/api.service'; //comunicação com a api

@Component({
  selector: 'app-interns',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './interns.component.html',
  styleUrl: './interns.component.scss',
})
export class InternsComponent implements OnInit {
  public estagiarios: Estagiario[] = []; //vetor para guardar os estagiários

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    console.log('página dos estagiários');
    this.apiService.getEstagiarios().subscribe({
      next: (data: any) => {
        this.estagiarios = data.estagiarios;
        console.log('Dados recebidos', this.estagiarios);
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
}
