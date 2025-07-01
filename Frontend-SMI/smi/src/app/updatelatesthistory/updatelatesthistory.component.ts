import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { KpiHistory } from '../model/KpiHistory.model';

@Component({
  selector: 'app-updatelatesthistory',
  templateUrl: './updatelatesthistory.component.html',
  styleUrls: ['./updatelatesthistory.component.css']
})
export class UpdatelatesthistoryComponent implements OnInit {
  historyForm: FormGroup;
  historyId: number;
  kpiHistories: KpiHistory[] = []; // Variable pour stocker l'historique des KPI

  constructor(
    private dialogRef: MatDialogRef<UpdatelatesthistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private kpiService: UserserviceService
  ) { }

  ngOnInit(): void {
    // Vérifiez si les données sont correctement initialisées
    if (this.data && this.data.historyId) {
        this.historyId = this.data.historyId;
    } else {
        console.error('History or historyId not found in dialog data:', this.data);
    }

    if (this.data && this.data.historyForm) {
        this.historyForm = this.data.historyForm;
    } else {
        // Si les données ne sont pas correctement initialisées, initialisez le formulaire ici
        this.historyForm = this.formBuilder.group({
            startDateP: [null, Validators.required],
            endDateP: [null, Validators.required],
            value: [null, Validators.required]
        });
    }
}



  // Fonction pour soumettre le formulaire d'historique
  submitHistory(): void {
    if (this.historyForm.valid) {
      const historyData = this.historyForm.value;

      // Convertir les valeurs de date en objets Date
      const startDate = new Date(historyData.startDateP);
      const endDate = new Date(historyData.endDateP);

      // Envoyer les données d'historique au backend pour la modification
      this.kpiService.updateKpiHistory(this.historyId, historyData).subscribe(
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

  closeDialog(): void {
    this.dialogRef.close();
  }
}
