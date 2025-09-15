import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-apresentacao',
  imports: [
    RouterLink
  ],
  standalone: true,
  templateUrl: './apresentacao.html',
  styleUrl: './apresentacao.scss'
})
export class ApresentacaoComponent {
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
