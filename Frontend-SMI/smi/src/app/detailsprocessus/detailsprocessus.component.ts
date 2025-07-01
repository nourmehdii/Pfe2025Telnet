import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-detailsprocessus',
  templateUrl: './detailsprocessus.component.html',
  styleUrls: ['./detailsprocessus.component.css']
})
export class DetailsprocessusComponent implements OnInit {
  processus: any[] = [];

  constructor(
    private userService: UserserviceService,
    private dialogRef: MatDialogRef<DetailsprocessusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    const activityId = this.data.activityId;

    this.userService.getProcessusByActivityId(activityId).subscribe(
      (processus: any[]) => {
        this.processus = processus;
      },
      (error) => {
        console.error('Error fetching processus:', error);
        // Gérer l'erreur ici
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
