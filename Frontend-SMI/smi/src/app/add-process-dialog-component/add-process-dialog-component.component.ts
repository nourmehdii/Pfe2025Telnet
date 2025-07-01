import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { Processus } from '../model/Processus.model';
import { Kpi } from '../model/Kpi.model';
import Swal from 'sweetalert2'; // Importer Swal depuis sweetalert2
import { MatDialogRef } from '@angular/material/dialog'; // Importer MatDialogRef

@Component({
  selector: 'app-add-process-dialog-component',
  templateUrl: './add-process-dialog-component.component.html',
  styleUrls: ['./add-process-dialog-component.component.css']
})
export class AddProcessDialogComponentComponent implements OnInit {
  newProcess: Processus = { id: 0, name: '', description: '', kpis: [] };
  selectedKPIs: number[] = [];
  kpiList: Kpi[] = [];

  constructor(
    private processusService: UserserviceService,
    private dialogRef: MatDialogRef<AddProcessDialogComponentComponent> // Injecter MatDialogRef
  ) { }

  ngOnInit(): void {
    this.loadKPIs();
  }

  loadKPIs() {
    this.processusService.getKpiList().subscribe(
      (kpis: Kpi[]) => {
        this.kpiList = kpis;
      },
      (error) => {
        console.error('Une erreur est survenue lors du chargement des KPIs :', error);
      }
    );
  }

  addProcess() {
    // Convertir les identifiants des KPI sélectionnés en objets Kpi
    const selectedKpis: Kpi[] = this.selectedKPIs.map(id => this.kpiList.find(kpi => kpi.id === id)).filter(kpi => kpi !== undefined);
    
    // Assurez-vous que tous les KPI sélectionnés ont été trouvés
    if (selectedKpis.length !== this.selectedKPIs.length) {
      Swal.fire({ // Utilisez Swal pour afficher une alerte d'erreur
        icon: 'error',
        title: 'Erreur',
        text: 'Certains KPI sélectionnés n\'ont pas été trouvés'
      });
      return;
    }

    // Attribuer les KPI sélectionnés au processus
    this.newProcess.kpis = selectedKpis;

    // Appelez la méthode de service pour créer le processus
    this.processusService.createProcessuss(this.newProcess).subscribe(
      (response) => {
        Swal.fire({ // Utilisez Swal pour afficher une alerte de succès
          icon: 'success',
          title: 'Succès',
          text: 'Le processus a été ajouté avec succès'
        });
        // Fermer la fenêtre modale
        this.dialogRef.close();
        // Réinitialisez les valeurs après l'ajout réussi du processus
        this.newProcess = { id: 0, name: '', description: '', kpis: [] };
        this.selectedKPIs = [];
      },
      (error) => {
        console.error('Une erreur est survenue lors de l\'ajout du processus :', error);
        Swal.fire({ // Utilisez Swal pour afficher une alerte d'erreur
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'ajout du processus'
        });
      }
    );
  }  
}
