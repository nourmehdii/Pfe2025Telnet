import { Component, OnInit } from '@angular/core';
import { Volet } from '../model/Volet.model';
import { UserserviceService } from '../services/userservice.service';
import { AjoutervoletComponent } from '../ajoutervolet/ajoutervolet.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ModifiervoletComponent } from '../modifiervolet/modifiervolet.component';

@Component({
  selector: 'app-listvolet',
  templateUrl: './listvolet.component.html',
  styleUrls: ['./listvolet.component.css']
})
export class ListvoletComponent implements OnInit {

  volets: Volet[] = [];
  voletId: number;
  p: number = 1;
  axeSelectionne: string = '';
  searchAxe: string = ''; // Ajoutez cette ligne pour déclarer la propriété searchAxe
  filteredVolets: Volet[] = [];
  constructor(private voletService: UserserviceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadVoletList();
  }


  loadVoletList(): void {
    this.voletService.getVoletList().subscribe(
      (volets) => {
        this.volets = volets;
        this.filterVoletsByAxe(); // Appliquer le filtre initial
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des volets:', error);
        // Gérez les erreurs comme nécessaire
      }
    );
  }

  openAjouterVoletModal(): void {
    const dialogRef = this.dialog.open(AjoutervoletComponent, {
      width: '500px',
      // d'autres options de modal peuvent être spécifiées ici
    });
  
    dialogRef.componentInstance.voletajout.subscribe(() => {
      this.loadVoletList(); // Assurez-vous que cette ligne est correctement écrite
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadVoletList(); 
      // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
    });
  }
  
  openUpdateVoletModal(voletId: number): void {
    const dialogRef = this.dialog.open(ModifiervoletComponent, {
      width: '500px',
      data: { voletId: voletId }
    });
  
    dialogRef.componentInstance.voletUpdated.subscribe(() => {
      this.loadVoletList();
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
    });
  }


  filterVoletsByAxe(): void {
    if (this.axeSelectionne === '') {
      // Si aucun axe n'est sélectionné, afficher tous les volets
      this.filteredVolets = this.volets;
    } else {
      // Sinon, filtrer les volets en fonction de l'axe sélectionné
      this.filteredVolets = this.volets.filter(volet => volet.axe.toUpperCase() === this.axeSelectionne);
    }
  }

  deleteVolet(voletId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.voletService.deleteVolet(voletId).subscribe(
          () => {
            Swal.fire(
              'Supprimé!',
              'Votre volet a été supprimé.',
              'success'
            );
            // Actualisez la liste des volets après la suppression
            this.loadVoletList();
          },
          (error) => {
            console.error('Erreur lors de la suppression du volet:', error);
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression du volet.',
              'error'
            );
            // Gérez les erreurs comme nécessaire
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Votre volet est en sécurité :)',
          'error'
        );
      }
    });
  }
}
