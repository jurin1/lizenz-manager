import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin(): void {
    const success = this.authService.login(this.username, this.password);
    console.log('Login attempt result:', success); // LOG A
    if (success) {
      console.log('Login successful, attempting navigation to /dashboard...'); // LOG B
      this.router.navigate(['/dashboard']); // <-- Die entscheidende Zeile
    } else {
      console.log('Login failed.'); // LOG C
      this.errorMessage = 'Ungültige Anmeldedaten';
    }
  }
}
