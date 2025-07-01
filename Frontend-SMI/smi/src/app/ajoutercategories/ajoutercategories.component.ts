import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserserviceService } from '../services/userservice.service';
import { Category } from '../model/Category.model';
import { Interaction } from '../model/Interaction.model';

@Component({
  selector: 'app-ajoutercategories',
  templateUrl: './ajoutercategories.component.html',
  styleUrls: ['./ajoutercategories.component.css']
})
export class AjoutercategoriesComponent implements OnInit {

  categories: Category[] = [];
  newCategory: Category = {
    name: '',
    interaction: Interaction.FAR // Valeur par défaut
  };
  // Enum disponible pour le template
  interactions: Interaction[] = [Interaction.CLOSE, Interaction.MEDIUM, Interaction.FAR];

  constructor(
    private categoryService: UserserviceService,
    private dialogRef: MatDialogRef<AjoutercategoriesComponent>
  ) { }

  ngOnInit(): void {
    this.loadCategoryList();
  }

  ajouterCategory(): void {
    if (!this.newCategory.name || !this.newCategory.interaction) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs (nom et interaction).'
      });
      return;
    }

    this.categoryService.createCategory(this.newCategory).subscribe(
      (response) => {
        console.log('Catégorie ajoutée avec succès : ', response);
        Swal.fire({
          icon: 'success',
          title: 'Catégorie ajoutée avec succès!',
          showConfirmButton: false,
          timer: 1500
        });
        this.newCategory = { name: '', interaction: Interaction.FAR }; // Réinitialiser
        this.dialogRef.close();
        this.loadCategoryList(); // Rafraîchir la liste
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la catégorie : ', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'ajout de la catégorie',
          text: 'Veuillez réessayer plus tard.'
        });
      }
    );
  }

  loadCategoryList(): void {
    this.categoryService.getCategoryList().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des catégories : ', error);
      }
    );
  }
}