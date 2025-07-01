import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateuserComponent } from '../updateuser/updateuser.component';
import { AjouteruserComponent } from '../ajouteruser/ajouteruser.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {
  
  listuser: User[];
  p: number = 1;
  collection: any[];
  searchName: string = '';
  updateUserForm: FormGroup;
  dialogRef: any;
  userId:number;
  
  
  constructor(
    private service: UserserviceService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  get filteredUsers(): User[] {
    return this.listuser ? this.listuser.filter(user => user.firstName.toLowerCase().includes(this.searchName.toLowerCase())) : [];
  }

  roles: string[] = ['Admin', 'Responsable Qualité', 'Directeur', 'Chef de Projet'];

  user: any = {
    activities: []
  };
  
  activities: any[] = [];
  selectedRole: string = '';
  selectedActivities: any[] = [];

  loadActivities() {
    this.service.getActivities().subscribe(data => {
      this.activities = data;
    });
  }

  onActivityChange(event: any, activity: any) {
    if (event.target.checked) {
      this.selectedActivities.push(activity);
    } else {
      const index = this.selectedActivities.findIndex((a: any) => a.id === activity.id);
      if (index !== -1) {
        this.selectedActivities.splice(index, 1);
      }
    }
  }

  register() {
    if (!this.selectedRole || this.selectedActivities.length === 0) {
      console.error('Veuillez sélectionner un rôle et au moins une activité.');
      return;
    }

    this.user.role = this.selectedRole;
    this.user.activities = this.selectedActivities;

    this.service.register(this.user).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }

  


  ngOnInit(): void {
    this.loadActivities();
    console.log('Fetching user list...');
    this.service.getUserList().subscribe(
      (users: User[]) => {
        console.log('Users:', users);
        this.listuser = users;
        this.loadRoles();
      },
      (error) => {
        console.log('Error fetching user list:', error);
      }
    );

    this.updateUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  loadRoles() {
    this.listuser.forEach((user: User) => {
      this.service.getRoleByUserId(user.id).subscribe(role => {
        user.role = role; // Assigner directement l'objet Role récupéré
      });
    });
  }
  

  loadUserActivities() {
    this.listuser.forEach((user: User) => {
      this.service.getUserActivities(user.id).subscribe(activities => {
        user.activities = activities;
      });
    });
  }

  openUpdateuserModal(userId: number): void {
    const dialogRef = this.dialog.open(UpdateuserComponent, {
      width: '500px',
      data: { userId: userId } // Correction: Assurez-vous que userId est correctement passé ici
    });
  
    dialogRef.componentInstance.userUpdated.subscribe(() => {
      this.refreshUserList(); // Rafraîchir la liste des utilisateurs après la mise à jour
      window.location.reload();
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      window.location.reload();
      
      // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
    });
  }
  
  refreshUserList(): void {
    this.service.getUserList().subscribe(
      (users: User[]) => {
        this.listuser = users;
      },
      (error) => {
        console.error('Error refreshing user list:', error);
      }
    );
  }
  
  
  

  updateUser(user: User): void {
    if (this.updateUserForm.invalid) {
      return;
    }

    const updatedUser: User = {
      id: user.id,
      firstName: this.updateUserForm.value.firstName,
      lastName: this.updateUserForm.value.lastName,
      email: this.updateUserForm.value.email,
      username: this.updateUserForm.value.username,
      password: this.updateUserForm.value.password,
      role: this.updateUserForm.value.role,
      activities: user.activities // Assuming you have activities in the user object
    };

    this.service.updateUser(updatedUser.id, updatedUser).subscribe(
      () => {
        console.log('User updated successfully');
        // You can add further actions here after successful update
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  openAjouteruserModal(): void {
    const dialogRef = this.dialog.open(AjouteruserComponent, {
      width: '500px',
      // d'autres options de modal peuvent être spécifiées ici
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //    this.loadCategories();
      window.location.reload();
  
      // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
    });


   
  }

  DeleteAdmin(user: User) {
    Swal.fire({
        title: 'Êtes-vous sûr?',
        text: "Voulez-vous supprimer cet étudiant avec l'ID " + user.id + ' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.isConfirmed) {
            this.service.deleteUser(user.id).subscribe(() => {
                Swal.fire(
                    'Supprimé!',
                    'L\'utilisateur a été supprimé avec succès.',
                    'success'
                ).then(() => {
                    this.router.navigate(['/listuser']).then(() => {
                        window.location.reload();
                    });
                });
            }, (error) => {
                Swal.fire(
                    'Erreur!',
                    'Une erreur s\'est produite lors de la suppression de l\'utilisateur.',
                    'error'
                );
                console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            });
        }
    });
}
}
