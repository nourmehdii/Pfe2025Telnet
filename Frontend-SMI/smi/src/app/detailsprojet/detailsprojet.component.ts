import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserserviceService } from '../services/userservice.service';
import { AjouterkpihistoryComponent } from '../ajouterkpihistory/ajouterkpihistory.component';
import { MatDialog } from '@angular/material/dialog';
import { KpiHistory } from '../model/KpiHistory.model';
import { ModifierkpihistoryComponent } from '../modifierkpihistory/modifierkpihistory.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detailsprojet',
  templateUrl: './detailsprojet.component.html',
  styleUrls: ['./detailsprojet.component.css']
})
export class DetailsprojetComponent implements OnInit {
  projectDetails: any;
  projectId: number = 0;
  kpiHistories: KpiHistory[] = [];
  objectif: number;
  previousKpiValue: number = 0; // Initialisation de previousKpiValue

  constructor(
    private route: ActivatedRoute,
    private projetService: UserserviceService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['id'];
      this.loadProjectDetails();
    });
  }

  loadProjectDetails(): void {
    this.projetService.getProjectDetails(this.projectId).subscribe(
      (project: any) => {
        this.projectDetails = project;
        this.fetchKpiHistories();
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du projet :', error);
      }
    );
  }

  openModal(kpiName: string): void {
    const kpiId = this.getKpiIdByName(kpiName);
    if (kpiId !== null) {
      const dialogRef = this.dialog.open(AjouterkpihistoryComponent, {
        width: '400px',
        data: { 
          projectId: this.projectId, 
          kpiId,
          objectif: null, // Envoyer la valeur null pour l'objectif
          valeur: null // Envoyer la valeur null pour la valeur
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.fetchKpiHistories();
      });
    } else {
      console.error('KPI not found with name:', kpiName);
    }
  }
  
  fetchKpiHistories(): void {
    this.projetService.getKpiHistoryByProjectId(this.projectId).subscribe(
      (history: KpiHistory[]) => {
        this.kpiHistories = history;
      },
      (error) => {
        console.error('Error fetching KPI history:', error);
      }
    );
  }

  getKpiValue(i: number, kpi: any): any {
    if (!this.kpiHistories) {
        return null;
    }
    const kpiHistory = this.kpiHistories.find(history => history.kpi.id === kpi.id);
    return kpiHistory ? kpiHistory.value : '';
}


  getKpiObjectif(i: number, kpi: any): any {
    const kpiHistory = this.kpiHistories.find(history => history.kpi.id === kpi.id);
    return kpiHistory ? kpiHistory.kpi_objectif : '';
  }

  getKpiDate(i: number, kpi: any): { startDate: Date, endDateP: Date } | null {
    if (this.kpiHistories === null) {
        return null;
    }

    const kpiHistory = this.kpiHistories.find(history => history.kpi.id === kpi.id);
    return kpiHistory ? { startDate: kpiHistory.startDateP, endDateP: kpiHistory.endDateP } : null;
}


  getKpiId(index: number, kpi: any): number {
    return kpi.id;
  }

  openModifierKpiHistoryModal(kpiId: number): void {
    const historyId = this.getHistoryIdByKpiId(kpiId);
    if (historyId !== null) {
      const kpiHistory = this.kpiHistories.find(history => history.kpi.id === kpiId);
      if (kpiHistory) {
        const dialogRef = this.dialog.open(ModifierkpihistoryComponent, {
          width: '400px',
          data: { historyId: historyId }
        });

        if (kpiHistory.value < kpiHistory.kpi_objectif) {
          this.snackBar.open('La valeur est inférieure à l\'objectif ! Complétez l\'analyse causale', 'Analyse causale', {
            duration: 5000,
            panelClass: ['error-snackbar']
          }).onAction().subscribe(() => {
            // Ajoutez le code pour ouvrir une fenêtre modale ou effectuer une autre action si nécessaire
          });
        }

        dialogRef.afterClosed().subscribe(result => {
          this.fetchKpiHistories();
        });
      } else {
        console.error('KPI history not found for KPI Id:', kpiId);
      }
    } else {
      console.error('History Id not found for KPI Id:', kpiId);
    }
  }

  showNotification(index: number, kpi: any): boolean {
    console.log('KPI Histories:', this.kpiHistories);
    const currentKpiValue = this.getKpiValue(index, kpi);
    console.log('Current KPI Value:', currentKpiValue);
    console.log('Previous KPI Value:', this.previousKpiValue);
    
    if (currentKpiValue <= kpi.objectif) {
      if (this.previousKpiValue > kpi.objectif) {
        console.log('Notification should be shown.');
        return true;
      }
    }
  
    this.previousKpiValue = currentKpiValue;
    return false;
  }
  
  getHistoryIdByKpiId(kpiId: number): number | null {
    const kpiHistory = this.kpiHistories.find(history => history.kpi.id === kpiId);
    return kpiHistory ? kpiHistory.id : null;
  }

  getKpiIdByName(kpiName: string): number | null {
    if (!this.projectDetails || !this.projectDetails.processus) {
      return null;
    }
    for (const processus of this.projectDetails.processus) {
      if (!processus.kpis) {
        continue;
      }
      for (const kpi of processus.kpis) {
        if (kpi.name === kpiName) {
          return kpi.id;
        }
      }
    }
    return null;
  }
}
