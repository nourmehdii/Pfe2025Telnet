import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'; // Importer SweetAlert

@Component({
  selector: 'app-ajouteruser',
  templateUrl: './ajouteruser.component.html',
  styleUrls: ['./ajouteruser.component.css']
})
export class AjouteruserComponent implements OnInit {

  user: any = {
    activities: []
  };
  activities: any[] = [];
  selectedRole: string = '';
  selectedActivities: any[] = [];

  constructor(private userService: UserserviceService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities() {
    this.userService.getActivities().subscribe(data => {
      this.activities = data;
    });
  }

  openAjouterprojetModal(): void {
    const dialogRef = this.dialog.open(AjouteruserComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onActivityChange(event: any, activity: any) {
    if (event.target.checked) {
      this.selectedActivities.push(activity);
    } else {
      const index = this.selectedActivities.findIndex(a => a.id === activity.id);
      if (index !== -1) {
        this.selectedActivities.splice(index, 1);
      }
    }
  }

  register() {
    console.log('Selected Role:', this.selectedRole);
    console.log('Selected Activities:', this.selectedActivities);
  
    if (!this.selectedRole || this.selectedActivities.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Veuillez sélectionner un rôle et au moins une activité.'
      });
      return;
    }
  
    this.user.role = this.selectedRole;
    this.user.activities = this.selectedActivities;
  
    this.userService.register(this.user).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'L\'utilisateur a été enregistré avec succès.'
        });
        console.log(response);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur.'
        });
        console.error(error);
      }
    );
  }
}
