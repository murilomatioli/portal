import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //se comunicar com o servidor
import { Observable } from 'rxjs';

export interface Estagiario {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string; //opcional
  techStack: string[];
  bio?: string;
  birth?: Date;
  startDate: Date;
  endDate?: Date;
  story: string;
  social: {
    linkedin?: string;
    instagram?: string;
    github?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:3000';
  constructor(private https: HttpClient) {} // lista os estagiarios

  public getEstagiarios(): Observable<Estagiario[]> {
    return this.https.get<Estagiario[]>(
      `${this.apiUrl}/estagiarios/getEstagiario`
    ); //requisição para a rota de estagiarios do back
  }
}
