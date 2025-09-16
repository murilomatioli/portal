import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet, Router, RouterLink } from '@angular/router';
import { ApiService, Estagiario } from './services/api.service';
import { NgIf, NgFor, CommonModule } from '@angular/common'; //mostrar os dados no HTML
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showHeader = false;
  
  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event):event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => { //filtra os eventos de navegacao concluida
      if (event.urlAfterRedirects === '/'){
        this.showHeader = false;
      } else {
        this.showHeader = true;
      }
    });
  }

}
