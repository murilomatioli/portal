import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-interns',
  imports: [],
  templateUrl: './interns.component.html',
  styleUrl: './interns.component.scss'
})
export class InternsComponent {
  constructor(private router: Router) { }

  irHome() {
    this.router.navigate(['/home']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }
}
