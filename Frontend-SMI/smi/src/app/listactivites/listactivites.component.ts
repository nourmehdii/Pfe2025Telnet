import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { MatDialog } from '@angular/material/dialog'; // Import du service MatDialog
import { AjouteractiviteComponent } from '../ajouteractivite/ajouteractivite.component';
import { Activity } from '../model/activities.mosel';
import { ModifieractiviteComponent } from '../modifieractivite/modifieractivite.component';
import { DetailsprocessusComponent } from '../detailsprocessus/detailsprocessus.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listactivites',
  templateUrl: './listactivites.component.html',
  styleUrls: ['./listactivites.component.css']
})
export class ListactivitesComponent implements OnInit {
  
  activities: Activity[]; // Propriété pour stocker la liste des activités récupérées
  newActivity: Activity = { id: 0, name: '', description: '', processus: [] }; // Déclaration de la propriété newActivity
  p:number=1;
  constructor(private activityService: UserserviceService, private dialog: MatDialog) { } // Injection de MatDialog

  ngOnInit(): void {
    this.fetchActivityLists(); // Appel à la méthode pour récupérer la liste des activités lors de l'initialisation du composant
  }

  fetchActivityLists(): void {
    this.activityService.getActivities().subscribe(
      (data: Activity[]) => {
        this.activities = data; // Stocke la liste des activités récupérées dans la propriété 'activities'
      },
      (error: any) => {
        console.error('Error fetching activity list:', error);
      }
    );
  }


  deleteActivity(activityId: number): void {
    this.activityService.deleteActivity(activityId).subscribe(
      response => {
        console.log('Activity deleted successfully');
        // Supprimez l'activité de la liste des activités affichées
        this.activities = this.activities.filter(activity => activity.id !== activityId);
        
        // Afficher une notification de succès avec SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Activity deleted successfully',
        }).then(() => {
          this.fetchActivityLists(); // Rafraîchir la liste après la suppression réussie
        });
      },
      error => {
        console.error('Error deleting activity:', error);
        
        // Afficher une notification d'erreur avec SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while deleting the activity',
        });
      }
    );
  }

  createActivity(): void {
    this.activityService.createActivity(this.newActivity).subscribe(
      (createdActivity: Activity) => {
        console.log('Activity created successfully:', createdActivity);
        // Effectuez des actions supplémentaires si nécessaire, comme rediriger l'utilisateur vers une autre page
        this.fetchActivityLists();
      },
      (error: any) => {
        console.error('Error creating activity:', error);
      }
    );
  }

  openAjouterActiviteModal(): void {
    const dialogRef = this.dialog.open(AjouteractiviteComponent, {
      width: '500px',
      // d'autres options de modal peuvent être spécifiées ici
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
    });
  }

  openDetailsprocessuseModal(activityId: number): void {
    const dialogRef = this.dialog.open(DetailsprocessusComponent, {
      width: '500px',
      data: { activityId: activityId } // Passer l'ID de l'activité à la modal
      // Vous pouvez ajouter d'autres options de modal ici
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Ajoutez ici tout traitement supplémentaire après la fermeture de la modal
    });
  }



 // Appeler cette méthode lorsque vous souhaitez ouvrir le modal pour la modification d'une activité
openUpdateModal(activityId: number): void {
  const dialogRef = this.dialog.open(ModifieractiviteComponent, {
    width: '500px',
    data: { id: activityId } // Transmettre un objet avec une propriété id
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // Mettre à jour la liste des activités si nécessaire
    if (result) {
      this.fetchActivityLists();
    }
  });
}

  
}