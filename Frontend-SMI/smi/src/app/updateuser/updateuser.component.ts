import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserserviceService } from '../services/userservice.service';
import { User } from '../model/user.model';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from '../model/Role.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../model/activities.mosel';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  id: number;
  currentUser: User = {} as User;
  updateUserForm: FormGroup;
  selectedRole: Role = {} as Role;
  roles: Role[] = [];
  activities: Activity[] = [];
  selectedActivities: Activity[] = [];
  listuser: User[] = [];
  userUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private service: UserserviceService,
    private route: Router,
    private router: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateuserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {
    this.updateUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      activities: [[]]
    });
  }

  ngOnInit(): void {
    this.id = this.data.userId;
    this.loadUser();
  }

  loadUser(): void {
    this.service.getUserById(this.id).subscribe((result: User) => {
      this.currentUser = result;
      this.updateUserForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email,
        password: this.currentUser.password
      });
  
      // Récupérer le rôle de l'utilisateur
      const userId = this.currentUser.id;
      this.service.getRoleByUserId(userId).subscribe((userRole: Role) => {
        // Sélectionner le rôle de l'utilisateur dans le formulaire
        this.updateUserForm.get('role').setValue(userRole.name);
      });
  
      this.loadActivities();
    });
  }



  loadRoles(): void {
    this.service.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
      this.selectedRole = this.roles.find(role => role.id === this.currentUser.role.id);
      this.updateUserForm.patchValue({
        role: this.selectedRole
      });
    });
  }

  loadActivities(): void {
    this.service.getActivities().subscribe((activities: Activity[]) => {
      this.activities = activities;
      this.selectedActivities = this.currentUser.activities;
      this.updateUserForm.patchValue({
        activities: this.selectedActivities
      });
    });
  }

  getUnselectedActivities(): Activity[] {
    return this.activities.filter(activity => !this.selectedActivities.some(selected => selected.id === activity.id));
  }

  updateUser(): void {
    if (this.updateUserForm.invalid) {
      return;
    }
  
    const updatedUser: User = {
      id: this.id,
      firstName: this.updateUserForm.value.firstName,
      lastName: this.updateUserForm.value.lastName,
      email: this.updateUserForm.value.email,
      password: this.updateUserForm.value.password,
      role: this.updateUserForm.value.role,
      activities: this.updateUserForm.value.activities
    };
  
    this.service.updateUser(updatedUser.id, updatedUser).subscribe(
      () => {
        console.log('User updated successfully');
        this.updateUserForm.reset();
  
  
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User updated successfully',
        })
      },
      (error) => {
        console.error('Error updating user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update user. Please try again later.',
        });
      }
    );
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

}
