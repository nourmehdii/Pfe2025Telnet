import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cadran } from '../model/cadran.model'; // Assurez-vous d'importer le bon modèle
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modifiercadran',
  templateUrl: './modifiercadran.component.html',
  styleUrls: ['./modifiercadran.component.css']
})
export class ModifiercadranComponent implements OnInit {
  cadranId: number; // Renommez la variable pour correspondre à votre modèle
  cadranDetails: Cadran; // Assurez-vous d'utiliser le bon modèle
  nouveauNomCadran: string; // Déclarez la propriété nouveauNomCadran

  @Output() cadranUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private cadranService: UserserviceService, // Assurez-vous d'utiliser le bon service
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModifiercadranComponent>
  ) { }

  ngOnInit(): void {
    this.cadranId = this.data.cadranId; // Utilisez la bonne clé pour obtenir l'ID du cadran
    this.loadCadranDetails(); // Appelez la méthode pour charger les détails du cadran
  }

  loadCadranDetails(): void {
    this.cadranService.getCadranById(this.cadranId).subscribe(
      (cadran) => {
        this.cadranDetails = cadran;
        console.log('Détails du cadran chargés avec succès:', this.cadranDetails);
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du cadran:', error);
      }
    );
  }
  

  updateCadran(): void {
    // Assurez-vous que l'ID du cadran est défini
    if (this.cadranId !== undefined) {
      // Utilisez directement la propriété name de cadranDetails
      this.cadranService.updateCadran(this.cadranId, this.cadranDetails).subscribe(
        (updatedCadran) => {
          console.log('Cadran mis à jour avec succès:', updatedCadran);
          Swal.fire('Succès', 'Le cadran a été mis à jour avec succès.', 'success');
          // Émettre un événement pour indiquer que le cadran a été mis à jour
          this.cadranUpdated.emit();
          // Fermer le modal
          this.dialogRef.close();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du cadran:', error);
          Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour du cadran.', 'error');
        }
      );
    } else {
      console.error('ID du cadran non défini');
    }
  }
  


}
