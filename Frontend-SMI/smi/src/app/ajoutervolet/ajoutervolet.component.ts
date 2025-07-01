import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Volet, EAxe } from '../model/Volet.model'; // Importer EAxe depuis Volet.model
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajoutervolet',
  templateUrl: './ajoutervolet.component.html',
  styleUrls: ['./ajoutervolet.component.css']
})
export class AjoutervoletComponent implements OnInit {
  volet: Volet = { name: '', axe: EAxe.INTERNE }; // Définir une valeur par défaut pour axe si nécessaire
  axes: string[] = [EAxe.INTERNE, EAxe.EXTERNE]; // Utiliser les valeurs de l'énumération EAxe pour les options de l'axe
  isOpen: boolean = true; // Définir la variable isOpen pour contrôler les animations
  @Output() voletajout: EventEmitter<void> = new EventEmitter<void>();
  constructor(public dialogRef: MatDialogRef<AjoutervoletComponent>, private voletService: UserserviceService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.voletService.createVolet(this.volet).subscribe(
      (newVolet) => {
        console.log('Volet ajouté avec succès:', newVolet);
        this.dialogRef.close(); // Ferme la modal
        Swal.fire('Succès', 'Le volet a été ajouté avec succès.', 'success');
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du volet:', error);
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de l\'ajout du volet.', 'error');
        // Gérez les erreurs comme nécessaire
      }
    );
  }
}
