import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserserviceService } from '../services/userservice.service';
import { Category } from '../model/Category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifiecategorie',
  templateUrl: './modifiecategorie.component.html',
  styleUrls: ['./modifiecategorie.component.css']
})
export class ModifiecategorieComponent implements OnInit {
  categoryId: number;
  categoryDetails: Category;

  constructor(private dialogRef: MatDialogRef<ModifiecategorieComponent>,
              private userService: UserserviceService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

              ngOnInit(): void {
                this.categoryId = this.data.categoryId;
                this.categoryDetails = this.data.categoryDetails;
              }
              

  updateCategory(): void {
    this.userService.updateCategory(this.categoryId, this.categoryDetails).subscribe(
      (updatedCategory) => {
        console.log('Catégorie mise à jour avec succès : ', updatedCategory);
        // Afficher une pop-up de succès
        Swal.fire({
          icon: 'success',
          title: 'Catégorie mise à jour avec succès!',
          showConfirmButton: false,
          timer: 1500
        });
        // Fermer le modal avec un résultat positif
        this.dialogRef.close(true); 
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la catégorie : ', error);
        // Afficher une pop-up d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la mise à jour de la catégorie',
          text: 'Veuillez réessayer plus tard.',
        });
        // Fermer le modal avec un résultat négatif
        this.dialogRef.close(false); 
      }
    );
  }
}
