import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Volet, EAxe } from '../model/Volet.model';
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modifiervolet',
  templateUrl: './modifiervolet.component.html',
  styleUrls: ['./modifiervolet.component.css']
})
export class ModifiervoletComponent implements OnInit {
  voletId: number;
  voletDetails: Volet;
  isOpen: boolean = true;

  // Utilisez le type d'énumération EAxe pour les options d'axe
  axeOptions: EAxe[] = Object.values(EAxe);

  @Output() voletUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private voletService: UserserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModifiervoletComponent>
  ) { }

  ngOnInit(): void {
    this.voletId = this.data.voletId;
    this.loadVoletDetails();
  }

  loadVoletDetails(): void {
    this.voletService.getVoletById(this.voletId).subscribe(
      (volet) => {
        this.voletDetails = volet;
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du volet:', error);
      }
    );
  }

  updateVolet(): void {
    this.voletService.updateVolet(this.voletId, this.voletDetails).subscribe(
      (updatedVolet) => {
        console.log('Volet mis à jour avec succès:', updatedVolet);
        Swal.fire('Succès', 'Le volet a été mis à jour avec succès.', 'success');
        // Émettre un événement pour indiquer que le volet a été mis à jour
        this.voletUpdated.emit();
        // Fermer le modal
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du volet:', error);
        Swal.fire('Erreur', 'Une erreur s\'est produite lors de la mise à jour du volet.', 'error');
      }
    );
  }
}
