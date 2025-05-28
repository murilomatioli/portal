import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) { }

  irHome() {
    this.router.navigate(['/home']);
  }

  irInterns() {
    this.router.navigate(['/interns']);
  }
}
