import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule, MatIconModule],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false; // Beispielwert, sollte durch Authentifizierungslogik ersetzt werden
  isMenuOpen = false; // Zustand des Menüs
  orderCount = 3;
  notificationCount = 10;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated(); // Überprüft den Authentifizierungsstatus
  }

  logout(): void {
    localStorage.clear(); // Löscht alle Daten im localStorage
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
