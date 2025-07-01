import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserserviceService } from '../services/userservice.service';
import { PlanifieractionComponent } from '../planifieraction/planifieraction.component';
import { ModalactionComponent } from '../modalaction/modalaction.component';
import { Action } from '../model/Action.model';
import { Cause } from '../model/Cause.model';
import { Analyse } from '../model/analyse.model';

@Component({
  selector: 'app-modalcauses',
  templateUrl: './modalcauses.component.html',
  styleUrls: ['./modalcauses.component.css']
})
export class ModalcausesComponent implements OnInit {
  @Output() refreshModal: EventEmitter<any> = new EventEmitter();

  @Input() causeId: number;
  analyse: Analyse; // Utilisation de l'objet Analyse complet
  causes: Cause[] = [];
  addedAction: Action;
  editedIndex: number = -1;
  message: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { analyseId: number },
    private analyseService: UserserviceService,
    private smsTestService: UserserviceService,
    private dialog: MatDialog,
    private userService: UserserviceService
  ) {}

  ngOnInit(): void {
    this.getAnalyse(this.data.analyseId);
    this.getCausesForAnalyse(this.data.analyseId);
  }

  getAnalyse(analyseId: number): void {
    this.analyseService.getAnalyseById(analyseId).subscribe(
      (analyse: Analyse) => {
        this.analyse = analyse;
      },
      (error: any) => {
        console.error('Error retrieving analysis:', error);
      }
    );
  }
  sendRappelSms(causeId: number): void {
    this.analyseService.sendRappelSms(causeId).subscribe(
      response => {
        alert(response); // Affiche une alerte avec le message de succès
      },
      error => {
        console.error('Erreur lors de l\'envoi du rappel SMS:', error);
        alert('Erreur lors de l\'envoi du rappel SMS');
      }
    );
  }

  openModalaction(causeId: number): void {
    const dialogRef = this.dialog.open(PlanifieractionComponent, {
      width: '400px',
      height: '400px',
      data: { causeId: causeId }
    });

    dialogRef.afterClosed().subscribe((result: Action) => {
      if (result) {
        this.addedAction = result;
        this.refreshActionList();
      }
    });
  }

  confirmDelete(causeId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer cette cause!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCause(causeId);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annulé', 'Votre action a été annulée :)', 'info');
      }
    });
  }

  updateCause(id: number, updatedCause: Cause): void {
    updatedCause.analyse = this.analyse; // Utilisation de l'objet Analyse complet

    this.userService.updateCause(id, updatedCause).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Cause mise à jour avec succès'
        });
        console.log('Cause updated successfully:', response);

        // Mise à jour localement la cause modifiée
        const index = this.causes.findIndex(c => c.id === updatedCause.id);
        if (index !== -1) {
          this.causes[index] = updatedCause;
        }

        // Réinitialisation de l'édition
        this.editedIndex = -1;
      },
      error => {
        console.error('Error updating cause:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la mise à jour de la cause'
        });
      }
    );
  }

  deleteCause(id: number): void {
    this.userService.deleteCause(id).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Cause supprimée avec succès'
        });
        console.log('Cause deleted successfully!');
        // Supprimer la cause du tableau local
        this.causes = this.causes.filter(c => c.id !== id);
      },
      error => {
        console.error('Error deleting cause:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de la suppression de la cause'
        });
      }
    );
  }

  refreshActionList(): void {
    // Implémenter la logique pour rafraîchir les actions liées aux causes
  }

  openDetailsModal(cause: Cause): void {
    const dialogRef = this.dialog.open(ModalactionComponent, {
      data: { analyseId: this.analyse.id, causes: [cause] }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

   
  }

  getCausesForAnalyse(analyseId: number): void {
    this.analyseService.getCausesForAnalyse(analyseId).subscribe(
      (causes: Cause[]) => {
        this.causes = causes;
        console.log('Causes for analysis:', causes);
      },
      (error: any) => {
        console.error('Error retrieving causes for analysis:', error);
      }
    );
  }

  editCell(index: number, field: string): void {
    this.editedIndex = index;
  }

  saveCell(index: number): void {
    const editedCause = this.causes[index];
    this.updateCause(editedCause.id, editedCause);
    this.editedIndex = -1;
  }

  cancelEdit(): void {
    this.editedIndex = -1;
    // Vous pouvez optionnellement annuler les changements dans editedCause si nécessaire
  }

  refreshTable(): void {
    this.getCausesForAnalyse(this.analyse.id);
  }

  refreshActions(): void {
    // Réinitialiser les données des causes depuis le service (à adapter selon votre logique de récupération des données)
    this.userService.getCausesForAnalyse(this.data.analyseId).subscribe(
      (causes: Cause[]) => {
        this.causes = causes || [];
        console.log('Actions refreshed successfully!');
      },
      (error: any) => { // Définir explicitement le type d'erreur
        console.error('Error refreshing actions:', error);
      }
    );
  }

}
