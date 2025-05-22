import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) { }

  irInterns() {
    this.router.navigate(['/interns']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }
}
