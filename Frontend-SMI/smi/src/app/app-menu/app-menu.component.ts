import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../model/Role.model';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.css']
})
export class AppMenuComponent implements OnInit {
  role: Role | null = null;
  userId: number | null = null;
  activeLink: string = 'home'; // Dashboard par défaut

  constructor(
    private userService: UserserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Détecter la route actuelle pour initialiser activeLink
    const currentRoute = this.router.url.split('/')[1] || 'home';
    this.activeLink = currentRoute;

    // Récupérer l'ID de l'utilisateur depuis le localStorage
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      this.userId = +userIdString;
    } else {
      console.error('ID de l\'utilisateur introuvable dans le stockage local');
      return;
    }

    // Appel à l'API pour récupérer le rôle de l'utilisateur
    if (this.userId) {
      this.userService.getRoleByUserId(this.userId).subscribe(
        (role: Role) => {
          this.role = role;
        },
        (error) => {
          console.error('Erreur lors de la récupération du rôle de l\'utilisateur :', error);
        }
      );
    }
  }

  setActiveLink(link: string): void {
    this.activeLink = link;
  }

  // Vérifie si le rôle de l'utilisateur correspond à l'un des rôles passés en argument
  isAny(...roles: string[]): boolean {
    return this.role ? roles.includes(this.role.name) : false;
  }

  // Vérifie si le rôle de l'utilisateur correspond à un rôle spécifique
  is(roleName: string): boolean {
    return this.role ? this.role.name === roleName : false;
  }
}