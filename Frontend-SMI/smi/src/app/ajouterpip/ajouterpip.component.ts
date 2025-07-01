import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { Pip } from '../model/Pip.model';
import { Category } from '../model/Category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouterpip',
  templateUrl: './ajouterpip.component.html',
  styleUrls: ['./ajouterpip.component.css']
})
export class AjouterpipComponent implements OnInit {

  newPip: Pip = {
    name: '',
    category: null,
    type: '',
    interaction: ''
  };

  categories: Category[] = [];

  constructor(private apiService: UserserviceService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.apiService.getCategoryList().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.validateForm()) {
      const categoryId: number = this.newPip.category.id;
      this.apiService.createPip(categoryId, this.newPip).subscribe(
        (response) => {
          console.log('PIP créé avec succès:', response);
          Swal.fire('Succès!', 'PIP ajouté avec succès!', 'success');
          this.resetForm();
        },
        (error) => {
          console.error('Erreur lors de la création du PIP:', error);
          Swal.fire('Erreur!', 'Une erreur est survenue lors de l\'ajout du PIP.', 'error');
        }
      );
    } else {
      console.error("La catégorie n'a pas été sélectionnée ou les champs sont vides.");
      Swal.fire('Erreur!', 'Veuillez remplir tous les champs et sélectionner une catégorie.', 'error');
    }
  }

  validateForm(): boolean {
    return this.newPip.category && this.newPip.name.trim() !== '' && this.newPip.type !== '' && this.newPip.interaction !== '';
  }

  resetForm(): void {
    this.newPip = {
      name: '',
      category: null,
      type: '',
      interaction: ''
    };
  }
}
