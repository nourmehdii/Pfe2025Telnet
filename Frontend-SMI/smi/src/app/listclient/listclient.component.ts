import { Component, OnInit } from '@angular/core';
import { Client } from '../model/Client.model';
import { UserserviceService } from '../services/userservice.service';
import { AjouterclientComponent } from '../ajouterclient/ajouterclient.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ModifierclientComponent } from '../modifierclient/modifierclient.component';
import { ClientDetailsComponent } from '../client-details/client-details.component';

@Component({
  selector: 'app-listclient',
  templateUrl: './listclient.component.html',
  styleUrls: ['./listclient.component.css']
})
export class ListclientComponent implements OnInit {
  clients: Client[] = [];
  updatedClient: Client;
  clientId: number;
  searchTerm: string = '';
  filteredClients: Client[] = [];
  p: number = 1;

  constructor(private userService: UserserviceService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadClients();
  }

  openAjoutercategoryModal(): void {
    const dialogRef = this.dialog.open(AjouterclientComponent, {
      width: '500px',
      // d'autres options de modal peuvent être spécifiées ici
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadClients();
    });
  }

  toggleActive(client: any) {
    client.active = !client.active;

    Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Le statut a été changé avec succès',
        width: '20rem',
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end',
        showConfirmButton: false
    });
  }

  openDetailsModal(client: Client): void {
    this.dialog.open(ClientDetailsComponent, {
      width: '400px',
      data: { clientDetails: client }
    });
  }

  openUpdateModal(clientId: number, updatedClient: Client): void {
    const dialogRef = this.dialog.open(ModifierclientComponent, {
      width: '500px',
      data: { clientId: clientId, clientDetails: updatedClient }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.loadClients();
      }
    });
  }

  loadClients(): void {
    this.userService.getAllClients().subscribe(
      (clients: Client[]) => {
        this.clients = clients;
        this.filterClients();
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des clients :', error);
      }
    );
  }

  filterClients(): void {
    if (!this.searchTerm) {
      this.filteredClients = this.clients;
    } else {
      this.filteredClients = this.clients.filter(client =>
        client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  deleteClient(id: number): void {
    Swal.fire({
      icon: 'question',
      title: 'Êtes-vous sûr ?',
      text: 'Voulez-vous vraiment supprimer ce client ?',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteClient(id).subscribe(
          () => {
            this.snackBar.open('Client supprimé avec succès', 'Fermer', { duration: 3000 });
            this.loadClients();
          },
          (error) => {
            console.error('Erreur lors de la suppression du client :', error);
            this.snackBar.open('Une erreur est survenue lors de la suppression du client', 'Fermer', { duration: 3000 });
          }
        );
      }
    });
  }
}
