import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PipsModalComponentComponent } from '../pips-modal-component/pips-modal-component.component';
import { Category } from '../model/Category.model';
import { Pip } from '../model/Pip.model';
import { AjouterpipComponent } from '../ajouterpip/ajouterpip.component';
import { Interaction } from '../model/Interaction.model';

@Component({
  selector: 'app-listepip',
  templateUrl: './listepip.component.html',
  styleUrls: ['./listepip.component.css']
})
export class ListepipComponent implements OnInit {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  selectedCategoryId: number | undefined;
  selectedFilter: string = 'all'; // Définir la valeur par défaut pour le filtre
  p: number=1;
  

  constructor(private userService: UserserviceService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.userService.getCategoryList().subscribe(
      (categories) => {
        this.categories = categories;
        this.filteredCategories = [...categories]; // Initialiser avec toutes les catégories
        this.sortCategoriesByInteraction(); // Trier immédiatement
      },
      (error) => {
        console.error('Error loading categories:', error);
        Swal.fire('Erreur', 'Impossible de charger les catégories', 'error');
      }
    );
  }

  sortCategoriesByInteraction(): void {
    this.filteredCategories.sort((a, b) => {
      const order = { CLOSE: 1, MEDIUM: 2, FAR: 3 };
      return order[a.interaction] - order[b.interaction];
    });
  }

  filterByInteraction(filterValue: string): void {
    this.selectedFilter = filterValue; // Mettre à jour la valeur du filtre
    if (filterValue === 'all') {
      this.filteredCategories = [...this.categories]; // Afficher toutes les catégories
    } else {
      this.filteredCategories = this.categories.filter(
        (category) => category.interaction === filterValue
      );
    }
    this.sortCategoriesByInteraction(); // Trier après filtrage
    this.p=1;
  }

  getPipsByCategoryId(categoryId: number): void {
    if (categoryId) {
      this.userService.getPipsByCategory(categoryId).subscribe(
        (pips) => {
          console.log(`Received PIPs for category with ID ${categoryId}:`, pips);
          if (pips.length > 0) {
            this.selectedCategoryId = categoryId;
            this.openPipsModal(pips, categoryId);
          } else {
            Swal.fire('Aucun PIP', 'Aucun PIP trouvé pour cette catégorie', 'info');
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            Swal.fire('Non autorisé', 'Vous n\'êtes pas autorisé à accéder aux PIPs de cette catégorie', 'error');
          } else {
            console.error(`Error fetching PIPs for category with ID ${categoryId}:`, error);
            Swal.fire('Erreur', 'Une erreur s\'est produite lors de la récupération des PIPs', 'error');
          }
        }
      );
    } else {
      console.error('categoryId is not defined.');
      Swal.fire('Erreur', 'L\'ID de la catégorie est manquant ou indéfini', 'error');
    }
  }

  openPipsModal(pips: Pip[], categoryId: number): void {
    const dialogRef = this.dialog.open(PipsModalComponentComponent, {
      data: { pips, categoryId },
      minWidth: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getBoxId(categoryName: string): string {
    return categoryName.replace(/\s+/g, '-').toLowerCase();
  }

  openAjouterpipModal(): void {
    const dialogRef = this.dialog.open(AjouterpipComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  getInteractionClass(interaction: Interaction): string {
    switch (interaction) {
      case Interaction.CLOSE:
        return 'inner-box';
      case Interaction.MEDIUM:
        return 'middle-box';
      case Interaction.FAR:
        return 'outer-box';
      default:
        return 'inner-box';
    }
  }

 getCategoryIcon(interaction: Interaction): string {
    switch (interaction) {
      case Interaction.CLOSE:
        return 'link';
      case Interaction.MEDIUM:
        return 'trending_flat';
      case Interaction.FAR:
        return 'trending_down';
      default:
        return 'category';
    }
  } 
  // NOUVEAU : Retourne la classe CSS pour le composant rating selon l'interaction
  getRatingClass(interaction: Interaction): string {
    switch (interaction) {
      case Interaction.CLOSE:
        return 'rating-close';
      case Interaction.MEDIUM:
        return 'rating-medium';
      case Interaction.FAR:
        return 'rating-far';
      default:
        return 'rating-close';
    }
  }

  // NOUVEAU : Détermine si une étoile doit être pleine selon l'interaction et l'index
  isStarFilled(interaction: Interaction, starIndex: number): boolean {
    switch (interaction) {
      case Interaction.CLOSE:
        return starIndex <= 3; // 3 étoiles pleines
      case Interaction.MEDIUM:
        return starIndex <= 2; // 2 étoiles pleines
      case Interaction.FAR:
        return starIndex <= 1; // 1 étoile pleine
      default:
        return false;
    }
  }
}