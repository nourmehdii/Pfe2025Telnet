import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { Category } from '../model/Category.model';
import { AjoutercategoriesComponent } from '../ajoutercategories/ajoutercategories.component';
import { MatDialog } from '@angular/material/dialog';
import { ModifiecategorieComponent } from '../modifiecategorie/modifiecategorie.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listecategories',
  templateUrl: './listecategories.component.html',
  styleUrls: ['./listecategories.component.css']
})
export class ListecategoriesComponent implements OnInit {
  categories: Category[] = [];
  p:number=1;
  constructor(private categoryService: UserserviceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  openAjoutercategoryModal(): void {
    const dialogRef = this.dialog.open(AjoutercategoriesComponent, {
      width: '500px',
      // d'autres options de modal peuvent être spécifiées ici
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadCategories();

      // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
    });
  }

  openUpdateModal(categoryId: number, categoryDetails: Category): void {
    const dialogRef = this.dialog.open(ModifiecategorieComponent, {
      width: '500px',
      data: { categoryId: categoryId, categoryDetails: categoryDetails } // Passer les données de la catégorie
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Mettre à jour la liste des catégories si nécessaire
      if (result) {
        this.loadCategories();
      }
    });
  }

  deleteCategory(categoryId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(categoryId).subscribe(
          () => {
            Swal.fire(
              'Supprimé!',
              'La catégorie a été supprimée avec succès.',
              'success'
            );
            // Mettre à jour la liste des catégories après la suppression
            this.loadCategories();
          },
          (error) => {
            console.error('Erreur lors de la suppression de la catégorie : ', error);
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors de la suppression de la catégorie.',
              'error'
            );
          }
        );
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategoryList().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des catégories :', error);
        // Gérez les erreurs comme nécessaire
      }
    );
  }
}
