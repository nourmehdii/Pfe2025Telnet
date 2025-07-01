import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserserviceService } from '../services/userservice.service';
import { Processus } from '../model/Processus.model';
import Swal from 'sweetalert2';
import { UpdateProcessusComponent } from '../update-processus/update-processus.component';
import { AjouterkpiComponent } from '../ajouterkpi/ajouterkpi.component';
import { DetailskpiComponent } from '../Detailskpi/detailskpi.component';
import { AddProcessDialogComponentComponent } from '../add-process-dialog-component/add-process-dialog-component.component';

@Component({
  selector: 'app-list-processus',
  templateUrl: './list-processus.component.html',
  styleUrls: ['./list-processus.component.css']
})
export class ListProcessusComponent implements OnInit {
  processusList: Processus[] = [];
  p: number = 1;


  constructor(private userService: UserserviceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProcessus();
  }

  loadProcessus(): void {
    this.userService.getProcessusList().subscribe(
      (processus: Processus[]) => {
        this.processusList = processus;
      },
      (error) => {
        console.error('Une erreur est survenue lors du chargement des processus :', error);
      }
    );
  }

  openAddProcessModal(): void {
    const dialogRef = this.dialog.open(AddProcessDialogComponentComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadProcessus();
    });
  }

  openUpdateProcessModal(processusId: number): void {
    const dialogRef = this.dialog.open(UpdateProcessusComponent, {
      width: '600px',
      data: { processusId: processusId }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadProcessus();
    });
  }

  openAjouterKpiDialog(processusId: number): void {
    console.log('Opening dialog with processusId:', processusId); // Debug log

    const dialogRef = this.dialog.open(AjouterkpiComponent, {
      data: { processusId: processusId } // Ensure processusId is passed here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
    });
   
  }
  

  openkpiModal(processusId: number): void {
    const dialogRef = this.dialog.open(DetailskpiComponent, {
      width: '600px',
      data: { processusId: processusId } // Passer l'ID du processus au composant de détails des KPI
    });
  
    
    dialogRef.afterClosed().subscribe(() => {
      this.loadProcessus();
    });
  }
  
  deleteProcessus(processusId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteProcessus(processusId).subscribe(
          () => {
            Swal.fire('Supprimé!', 'Le processus a été supprimé avec succès.', 'success');
            this.loadProcessus();
          },
          (error) => {
            console.error('Une erreur est survenue lors de la suppression du processus :', error);
            Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression du processus.', 'error');
          }
        );
      }
    });
  }
}
