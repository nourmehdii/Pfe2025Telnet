import { Component, OnInit } from '@angular/core';
import { AjouterResultatpipComponent } from '../ajouter-resultatpip/ajouter-resultatpip.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ResultsPip } from '../model/ResultsPip.model';
import { UserserviceService } from '../services/userservice.service';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ModifierresultatpipComponent } from '../modifierresultatpip/modifierresultatpip.component';

@Component({
  selector: 'app-resultatpip',
  templateUrl: './resultatpip.component.html',
  styleUrls: ['./resultatpip.component.css']
})
export class ResultatpipComponent implements OnInit {
  resultsPipList$: Observable<ResultsPip[]>;
  p: number = 1;

  constructor(private dialog: MatDialog, private userService: UserserviceService) { }

  ngOnInit(): void {
    this.loadResultsPipList();
  }

  openAddPipModal(): void {
    const dialogRef = this.dialog.open(AjouterResultatpipComponent, {
      width: '600px',
      // Vous pouvez ajouter plus d'options comme la hauteur, la position, etc.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Vous pouvez gérer le résultat ici si nécessaire
      // Par exemple, recharger la liste des processus après la fermeture de la boîte de dialogue
      this.loadResultsPipList();
    });
  }

  loadResultsPipList(): void {
    this.resultsPipList$ = this.userService.getResultsPipList();
    this.resultsPipList$.subscribe(results => {
      console.log('Liste des résultats PIP :', results);
    });
  }

  openUpdatePipresultattModal(pipresulatId: number): void {
    console.log('Ouvrir la modal de modification du résultat PIP - pipresultatId:', pipresulatId); 
    const dialogRef = this.dialog.open(ModifierresultatpipComponent, {
      width: '500px',
      data: { pipresulatId: pipresulatId } // Transmission de l'ID du résultat PIP
    });
  
    // Souscrire à l'événement pipresultatUpdated émis par la modal après la modification du résultat PIP
    dialogRef.componentInstance.pipresultatUpdated.subscribe(() => {
      this.loadResultsPipList(); // Mettre à jour la liste des résultats PIP après la modification
    });
  
    // Souscrire à l'événement afterClosed émis lorsque la modal est fermée
    dialogRef.afterClosed().subscribe(result => {
      console.log('La modal a été fermée');
      // Traitements supplémentaires après la fermeture de la modal
    });
  }
  

  deleteResultsPip(resultsPipId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas récupérer ce résultat PIP!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteResultsPip(resultsPipId)
          .pipe(
            switchMap(() => this.userService.getResultsPipList())
          )
          .subscribe(
            updatedResultsPipList => {
              console.log('Résultat PIP supprimé avec succès');
              // Mise à jour de la liste des résultats PIP
              this.resultsPipList$ = of(updatedResultsPipList); // Correction ici
              Swal.fire(
                'Supprimé!',
                'Votre résultat PIP a été supprimé.',
                'success'
              );
            },
            error => {
              console.error('Une erreur s\'est produite lors de la suppression du résultat PIP :', error);
              Swal.fire(
                'Erreur!',
                'Une erreur s\'est produite lors de la suppression du résultat PIP.',
                'error'
              );
            }
          );
      }
    });
  }
  

}
