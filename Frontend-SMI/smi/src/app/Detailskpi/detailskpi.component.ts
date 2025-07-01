import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserserviceService } from '../services/userservice.service';
import { Kpi } from '../model/Kpi.model';
import { AjouterkpiComponent } from '../ajouterkpi/ajouterkpi.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detailskpi',
  templateUrl: './detailskpi.component.html',
  styleUrls: ['./detailskpi.component.css']
})
export class DetailskpiComponent implements OnInit {
  kpis: Kpi[] = [];
  p: number = 1;
  editedIndex: number | null = null;

  constructor(
    private userService: UserserviceService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DetailskpiComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loadKpis();
  }

  loadKpis(): void {
    const processusId = this.data.processusId; // Récupérer l'ID du processus
    if (processusId) {
      this.userService.getKpisByP(processusId).subscribe(
        (kpis: Kpi[]) => {
          this.kpis = kpis;
        },
        (error) => {
          console.error('Error fetching KPIs:', error);
          this.snackBar.open('Erreur lors de la récupération des KPI', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      );
    } else {
      console.error('Processus ID is not defined.');
      this.snackBar.open('ID du processus non défini', 'Fermer', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

  openAddkpisModal(processusId: number): void {
    const dialogRef = this.dialog.open(AjouterkpiComponent, {
      width: '600px',
      data: { processusId: processusId } // Pass processusId to the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Rafraîchit la liste des KPI après la fermeture du modal
      this.loadKpis();
    });
  }

  deleteKpi(kpi: Kpi): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce KPI ?')) {
      this.userService.deleteKpi(kpi.id).subscribe(
        () => {
          console.log('KPI deleted successfully');
          this.loadKpis(); // Rafraîchit la liste des KPI après suppression
          this.snackBar.open('KPI supprimé avec succès!', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
        (error) => {
          console.error('Error deleting KPI:', error);
          this.snackBar.open('Erreur lors de la suppression du KPI', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      );
    }
  }

  editCell(index: number): void {
    this.editedIndex = index;
  }

  saveKpi(kpi: Kpi): void {
    this.userService.updateKpi(kpi.id, kpi).subscribe(
      (updatedKpi: Kpi) => {
        console.log('KPI updated successfully', updatedKpi);
        this.editedIndex = null;
        this.loadKpis(); // Rafraîchit la liste des KPI après mise à jour
      },
      (error) => {
        console.error('Error updating KPI:', error);
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
