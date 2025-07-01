import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pip } from '../model/Pip.model';
import { Category } from '../model/Category.model';
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierpip',
  templateUrl: './modifierpip.component.html',
  styleUrls: ['./modifierpip.component.css']
})
export class ModifierpipComponent implements OnInit {

  pipId: number;
  pipDetails: Pip;
  category: Category;
  categories: Category[];
  selectedCategoryId: number;

  @Output() pipUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pipService: UserserviceService
  ) { }

  ngOnInit(): void {
    this.pipId = this.data.pipId;
    this.loadPipDetails();
    this.loadCategories();
  }

  loadCategories(): void {
    console.log('Chargement des catégories...');
    this.pipService.getCategoryList()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log('Catégories chargées avec succès:', categories);
      }, error => {
        console.error('Erreur lors du chargement des catégories :', error);
      });
  }

  loadCategoryById(categoryId: number): void {
    this.pipService.getCategoryById(categoryId)
      .subscribe(category => {
        this.category = category;
      }, error => {
        console.error('Erreur lors du chargement de la catégorie :', error);
      });
  }

  loadPipDetails(): void {
    console.log('Chargement des détails du PIP...');
    this.pipService.getPipById(this.pipId)
      .subscribe(pip => {
        this.pipDetails = pip;
        this.selectedCategoryId = pip.category.id;
        this.loadCategoryById(pip.category.id);
        console.log('Détails du PIP chargés avec succès:', pip);
      }, error => {
        console.error('Erreur lors du chargement des détails du PIP :', error);
      });
  }

  updatePip(): void {
    if (!this.pipId || !this.pipDetails) {
      console.error('Données PIP invalides');
      return;
    }

    if (!this.category) {
      this.loadCategoryById(this.selectedCategoryId);
      return;
    }

    const categoryId = this.category.id;

    this.pipService.updatePip(this.pipId, categoryId, this.pipDetails)
      .subscribe(updatedPip => {
        console.log('Mise à jour du PIP effectuée avec succès :', updatedPip);
        Swal.fire('Succès', 'Le PIP a été mis à jour avec succès', 'success');
        this.pipUpdated.emit(); // Émettre l'événement pipUpdated après la mise à jour
      }, error => {
        console.error('Erreur lors de la mise à jour du PIP :', error);
        Swal.fire('Erreur', 'Une erreur est survenue lors de la mise à jour du PIP', 'error');
      });
  }

  categorySelectionChanged(): void {
    this.loadCategoryById(this.selectedCategoryId);
  }

  closeModal(): void {
    console.log('Fermeture de la modal');
    this.pipUpdated.emit(); // Émettre l'événement pipUpdated lors de la fermeture de la modal
  }
}
