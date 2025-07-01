import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserserviceService } from '../services/userservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Activity } from '../model/activities.mosel'; // Assurez-vous du nom correct du fichier modèle
import { Processus } from '../model/Processus.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifieractivite',
  templateUrl: './modifieractivite.component.html',
  styleUrls: ['./modifieractivite.component.css']
})
export class ModifieractiviteComponent implements OnInit {
  activity: Activity = { name: '', description: '', processus: [] };
  processusList: Processus[] = [];
  selectedProcessus: Processus[] = [];
  newProcessusName: string = '';

  constructor(
    private activityService: UserserviceService,
    public dialogRef: MatDialogRef<ModifieractiviteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  ngOnInit(): void {
    this.fetchActivityDetails();
    this.fetchAllProcessus();
  }

  fetchActivityDetails(): void {
    this.activityService.getActivityById(this.data.id).subscribe(
      (activity: Activity) => {
        this.activity = activity;
        this.selectedProcessus = this.activity.processus; // Récupérer les processus liés à l'activité
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching activity details:', error);
      }
    );
  }

  fetchAllProcessus(): void {
    this.activityService.getProcessusList().subscribe(
      (processusList: Processus[]) => {
        this.processusList = processusList;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching processus list:', error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewProcessus(): void {
    if (this.newProcessusName && this.newProcessusName.trim() !== '') {
      const newProcessus: Processus = { id: null, name: this.newProcessusName.trim(), description: '' };
      this.activity.processus.push(newProcessus);
      this.selectedProcessus.push(newProcessus);
      this.newProcessusName = '';
    }
  }
  updateActivity(): void {
    this.activity.processus = this.selectedProcessus;
    
    this.activityService.updateActivity(this.activity.id, this.activity).subscribe(
      updatedActivity => {
        console.log('Activity updated successfully:', updatedActivity);
        // Afficher une notification de succès avec SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Activity updated successfully',
        });
        this.dialogRef.close(updatedActivity);
      },
      error => {
        console.error('Error updating activity:', error);
        // Afficher une notification d'erreur avec SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the activity',
        });
      }
    );
  }
  

  compareProcessus(processus1: Processus, processus2: Processus): boolean {
    return processus1 && processus2 ? processus1.id === processus2.id : processus1 === processus2;
  }
}
