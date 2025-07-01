import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modifierkpihistory',
  templateUrl: './modifierkpihistory.component.html',
  styleUrls: ['./modifierkpihistory.component.css']
})
export class ModifierkpihistoryComponent implements OnInit {
  kpiId: number;
  projectId: number;
  historyId: number;
  historyForm: FormGroup; // Formulaire pour saisir les détails de l'historique
  objectif: number; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModifierkpihistoryComponent>,
    private formBuilder: FormBuilder,
    private apiService: UserserviceService // Remplacez "YourApiService" par le nom de votre service API réel
  ) { }

  ngOnInit(): void {
    // Récupérer les données passées au modal
    this.kpiId = this.data.kpiId;
    this.projectId = this.data.projectId;
    this.historyId = this.data.historyId;
    this.objectif = this.data.objectif; // Ajout de cette ligne
  
    // Initialiser le formulaire avec les validateurs
    this.historyForm = this.formBuilder.group({
      startDateP: ['', Validators.required],
      endDateP: ['', Validators.required],
      value: ['', Validators.required]
    });
  
    // Récupérer les détails de l'historique à modifier
    this.apiService.getKpiHistoryById(this.historyId).subscribe(
      (history: any) => {
        // Pré-remplir le formulaire avec les valeurs existantes
        this.historyForm.patchValue({
          startDateP: history.startDateP,
          endDateP: history.endDateP,
          value: history.value
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'historique KPI à modifier:', error);
        // Gérer l'erreur ici
      }
    );
  }
  

  submitHistory(): void {
    if (this.historyForm.valid) {
      const historyData = this.historyForm.value;
  
      // Assurez-vous que this.data contient l'objectif
      if (this.data && typeof this.data.objectif === 'number') {
        const objectif = this.data.objectif;
  
        // Convertir la valeur de l'historique en nombre
        const historyValue = parseFloat(historyData.value);
  
        if (!isNaN(historyValue)) {
          if (historyValue >= objectif) {
            // Afficher le Swal de réussite
            Swal.fire('Succès', 'La valeur du KPI est supérieure ou égale à l\'objectif.', 'success');
          } else {
            // Afficher le Swal d'échec avec l'invitation à compléter l'analyse causale
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: 'La valeur est inférieure à l\'objectif ! Complétez l\'analyse causale.'
            });
          }
        } else {
          console.error('La valeur de l\'historique KPI n\'est pas un nombre valide.');
        }
      } else {
        console.error('L\'objectif est manquant ou invalide.');
      }
  
      // Envoyer les données d'historique au backend pour la modification
      this.apiService.updateKpiHistory(this.historyId, historyData).subscribe(
        (response) => {
          console.log('Historique KPI modifié avec succès:', response);
          this.dialogRef.close(); // Fermer le modal après la modification de l'historique
        },
        (error) => {
          console.error('Erreur lors de la modification de l\'historique KPI:', error);
          // Gérer l'erreur ici
        }
      );
    }
  }
  

  // Fonction pour fermer le modal
  closeDialog(): void {
    this.dialogRef.close();
  }
}
