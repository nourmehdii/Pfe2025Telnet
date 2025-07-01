import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Cause } from '../model/Cause.model';
import { UserserviceService } from '../services/userservice.service'; // Assurez-vous que ce chemin est correct
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Action } from '../model/Action.model';
import { PlanifieractionComponent } from '../planifieraction/planifieraction.component';

@Component({
  selector: 'app-modalaction',
  templateUrl: './modalaction.component.html',
  styleUrls: ['./modalaction.component.css']
})
export class ModalactionComponent implements OnInit {
  causes: Cause[] = [];
  maDate: Date = new Date();
  @Input() cause: any[];

  editMode: boolean = false;
  editedIndex: number = -1;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { analyseId: number, causes: Cause[], actionService: UserserviceService },
    private userService: UserserviceService
  ) {
    this.causes = data.causes || [];
  }

  ngOnInit(): void {
    // Initialisation du composant
  }

  openModalaction(causeId: number): void {
    const dialogRef = this.dialog.open(PlanifieractionComponent, {
      width: '400px',
      height: '400px',
      data: { causeId: causeId }
    });

    dialogRef.afterClosed().subscribe((result: Action) => {
      if (result) {
        // Gérer l'action planifiée si nécessaire
        this.refreshActions(); // Actualiser la liste des actions après l'ajout/modification
      }
    });
  }

  deleteAction(index: number): void {
    // Demander confirmation à l'utilisateur avant de supprimer l'action
    const confirmation = window.confirm('Voulez-vous vraiment supprimer cette action ?');
  
    if (confirmation) {
      // Récupérer l'ID de l'action à supprimer
      const actionIdToDelete = this.causes[0].actions[index].id;
  
      // Appeler le service pour supprimer l'action
      this.userService.supprimerAction(actionIdToDelete).pipe(
        // Gérer les erreurs potentielles lors de la suppression
        catchError((error: any) => {
          console.error('Erreur lors de la suppression de l\'action :', error);
          return of(null); // Retourner un Observable vide pour continuer le flux
        })
      ).subscribe(
        () => {
          // Supprimer l'action de la liste locale après la réussite de la suppression côté serveur
          this.causes[0].actions.splice(index, 1);
          console.log('Action supprimée avec succès !');
          this.refreshActions(); // Actualiser la liste des actions
        }
      );
    } else {
      console.log('Suppression annulée par l\'utilisateur.');
    }
  }
  
  

  editCell(index: number, field: string): void {
    this.editedIndex = index;
  }

  saveCell(index: number): void {
    this.editedIndex = -1; // Sortir du mode d'édition après avoir sauvegardé
    // Implémenter votre logique pour sauvegarder les données modifiées ici si nécessaire
  }

  editAction(index: number): void {
    // Implémenter la logique pour éditer l'action en fonction de l'index si nécessaire
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
