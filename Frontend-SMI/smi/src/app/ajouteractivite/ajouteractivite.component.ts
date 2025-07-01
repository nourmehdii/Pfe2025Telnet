import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { FormControl } from '@angular/forms';
import { Activity } from '../model/activities.mosel';
import { Processus } from '../model/Processus.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouteractivite',
  templateUrl: './ajouteractivite.component.html',
  styleUrls: ['./ajouteractivite.component.css']
})
export class AjouteractiviteComponent implements OnInit {
  
  newActivity: Activity = {
    id: 0,
    name: '',
    description: '',
    processus: [] // Assurez-vous que processus est initialisé correctement selon votre modèle
  };

  processusList: Processus[] = []; // Déclarez la propriété processusList de type Processus
  selectedProcessus = new FormControl(); // Initialisez le formulaire de sélection de processus

  constructor(private userService: UserserviceService) { }

  ngOnInit(): void {
    this.fetchProcessusList(); // Appeler la méthode pour récupérer la liste des processus lors de l'initialisation du composant
  }

  fetchProcessusList(): void {
    // Appeler le service pour récupérer la liste des processus
    this.userService.getProcessusList().subscribe(
      (data: Processus[]) => {
        this.processusList = data; // Assigner la liste des processus récupérée à la propriété processusList
        console.log('Processus list:', this.processusList); // Vérifier les données des processus récupérées
      },
      (error: any) => {
        console.error('Error fetching processus list:', error);
      }
    );
  }

  createActivity(): void {
    const selectedProcessusIds = this.selectedProcessus.value;
    const selectedProcessusObjects = this.processusList.filter(processus => selectedProcessusIds.includes(processus.id));
    this.newActivity.processus = selectedProcessusObjects;
  
    console.log('Selected processus:', this.selectedProcessus.value);
  
    this.userService.createActivity(this.newActivity)
      .subscribe(
        createdActivity => {
          console.log('Activity created successfully:', createdActivity);
          // Afficher une notification de succès avec SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Activity created successfully',
          });
          // Réinitialiser les valeurs du formulaire ou effectuer d'autres actions nécessaires après la création réussie de l'activité
        },
        error => {
          console.error('Error creating activity:', error);
          // Afficher une notification d'erreur avec SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while creating the activity',
          });
          // Gérer les erreurs ici (par exemple, afficher un message d'erreur à l'utilisateur)
        }
      );
  }
}
