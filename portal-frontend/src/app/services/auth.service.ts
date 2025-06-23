import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  router: any;
  constructor(private http: HttpClient) { }

  //rota de login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // se a resposta tiver um token ele armazena no localStorage do navegador
        if(response && response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      })
    );
  }

  //rota de cadastro
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createUser`, userData);
  }

  //pega o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  //verifica se o usuário ta autenticado
  isAuthenticated(): boolean {
    return !!this.getToken(); //retorna true se o token existir, false se não existir
  }

  storageToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  logoutToken(): void {
    localStorage.removeItem('auth_token'); //remove o token do localStorage
    this.router.navigate(['/login']); //redireciona para a página de login
  }

  isLogged(): boolean {
    return !!this.getToken(); 
  }
}
