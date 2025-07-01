import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../model/Client.model';
import { UserserviceService } from '../services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierclient',
  templateUrl: './modifierclient.component.html',
  styleUrls: ['./modifierclient.component.css']
})
export class ModifierclientComponent implements OnInit {
  updatedClient: Client;

  constructor(
    private dialogRef: MatDialogRef<ModifierclientComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private clientService: UserserviceService
  ) { }

  ngOnInit(): void {
    if (this.data && this.data.clientDetails) {
      this.updatedClient = { ...this.data.clientDetails };
    } else {
      console.error('Données clientDetails manquantes ou incorrectes.');
      this.updatedClient = {
        name: '', phone: '', active: false, email: '', streetAddress: '', city: '',
        state: '', postalCode: '', country: '', notes: ''
      };
    }
  }

  updateClient(): void {
    const id = this.data.clientId; 
    this.clientService.updateClient(id, this.updatedClient)
      .subscribe((response: Client) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Client mis à jour avec succès',
          width: '20rem',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        });
        this.dialogRef.close(true); // Passer true pour indiquer que la mise à jour a réussi
      }, (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: `Erreur lors de la mise à jour du client : ${error.message}`,
          width: '20rem',
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: 'top-end',
          showConfirmButton: false
        });
        console.error('Erreur lors de la mise à jour du client :', error);
        this.dialogRef.close(false); // Passer false pour indiquer que la mise à jour a échoué
      });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
