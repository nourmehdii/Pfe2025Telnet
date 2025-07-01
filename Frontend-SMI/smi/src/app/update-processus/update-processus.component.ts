import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { Processus } from '../model/Processus.model';
import { Kpi } from '../model/Kpi.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-processus',
  templateUrl: './update-processus.component.html',
  styleUrls: ['./update-processus.component.css']
})
export class UpdateProcessusComponent implements OnInit {
  updateProcessusForm: FormGroup;
  processus: Processus;
  kpiList: Kpi[];
  kpis: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private processusService: UserserviceService,
    public dialogRef: MatDialogRef<UpdateProcessusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { processusId: number }, // Injection des données passées depuis la modal
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Créer une instance de FormGroup et initialiser le formulaire
    this.updateProcessusForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      kpis: [[]]
    });

    // Récupération de l'ID du processus depuis les données passées
    const processusId = this.data.processusId;

    this.loadKPIs();

    // Charger les détails du processus en fonction de son ID
    this.processusService.getProcessusById(processusId).subscribe(
      (processus: Processus) => {
        this.processus = processus;
        // Remplir le formulaire avec les détails du processus récupérés
        this.updateProcessusForm.patchValue({
          name: this.processus.name,
          description: this.processus.description,
          kpis: this.processus.kpis.map(kpi => kpi.id)
        });
      },
      (error) => {
        console.error('Une erreur est survenue lors du chargement du processus :', error);
        this.snackBar.open('Une erreur est survenue lors du chargement du processus', 'Fermer', {
          duration: 5000
        });
      }
    );
  }

  // Méthode pour charger la liste des KPIs
  loadKPIs() {
    this.processusService.getKpiList().subscribe(
      (kpis: Kpi[]) => {
        this.kpiList = kpis;
      },
      (error) => {
        console.error('Une erreur est survenue lors du chargement des KPIs :', error);
        this.snackBar.open('Une erreur est survenue lors du chargement des KPIs', 'Fermer', {
          duration: 5000
        });
      }
    );
  }

  // Méthode pour mettre à jour le processus
  updateProcessus() {
    if (this.updateProcessusForm.valid) {
      const updatedProcessus: Processus = {
        id: this.processus.id,
        name: this.updateProcessusForm.value.name,
        description: this.updateProcessusForm.value.description,
        kpis: this.updateProcessusForm.value.kpis.map((kpiId: number) =>
          this.kpiList.find(kpi => kpi.id === kpiId))
      };
  
      this.processusService.updateProcessus(this.processus.id, updatedProcessus).subscribe(
        (response) => {
          this.snackBar.open('Le processus a été mis à jour avec succès', 'Fermer', {
            duration: 5000
          });
          this.dialogRef.close();
        },
        (error) => {
          console.error('Une erreur est survenue lors de la mise à jour du processus :', error);
          this.snackBar.open('Une erreur est survenue lors de la mise à jour du processus', 'Fermer', {
            duration: 5000
          });
        }
      );
    }
  }
}
