import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../model/Project.model';
import { Processus } from '../model/Processus.model';
import { UserserviceService } from '../services/userservice.service';
import { Client } from '../model/Client.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifierproject',
  templateUrl: './modifierproject.component.html',
  styleUrls: ['./modifierproject.component.css']
})
export class ModifierprojectComponent implements OnInit {
  @Output() projectUpdated = new EventEmitter<void>();

  projectForm: FormGroup;
  processusList: Processus[] = [];
  clientList: Client[] = [];

  constructor(
    private projectService: UserserviceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModifierprojectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number }
  ) { }

  ngOnInit(): void {
    this.initProjectForm();
    this.loadClientList();
    this.loadProcessusList();
    this.loadProjectDetails();
  }

  initProjectForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      processus: [[], Validators.required],
      cli: [null, Validators.required]
    });
  }
  
  loadProjectDetails(): void {
    const projectId = this.data.projectId;
    this.projectService.getProjectById(projectId).subscribe(
      (project: Project) => {
        const startDate = project.projectDate.startDate ? new Date(project.projectDate.startDate) : null;
        const endDate = project.projectDate.endDate ? new Date(project.projectDate.endDate) : null;
  
        this.projectForm.patchValue({
          name: project.name,
          type: project.type,
          startDate: startDate ? startDate.toISOString().substring(0, 10) : null,
          endDate: endDate ? endDate.toISOString().substring(0, 10) : null,
          processus: project.processus ? project.processus.map(p => p.id) : [],
          cli: project.cli ? project.cli.id : null
        });
      },
      (error) => {
        console.error('Error fetching project details:', error);
      }
    );
  }

  loadProcessusList(): void {
    this.projectService.getProcessusList().subscribe(
      (processus: Processus[]) => {
        this.processusList = processus;
      },
      (error) => {
        console.error('Error fetching processus list:', error);
      }
    );
  }

  loadClientList(): void {
    this.projectService.getAllClients().subscribe(
      (clients: Client[]) => {
        this.clientList = clients;
      },
      (error: any) => {
        console.error('Error fetching client list:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      const projectId = this.data.projectId;

      const startDate: Date | null = formData.startDate ? new Date(formData.startDate) : null;
      const endDate: Date | null = formData.endDate ? new Date(formData.endDate) : null;

      const updatedProjectData: Project = {
        id: projectId,
        name: formData.name,
        type: formData.type,
        startDate: startDate,
        endDate: endDate,
        processus: formData.processus.map((id: number) => ({ id: id })),
        cli: {
          id: formData.cli,
          name: '',
          phone: '',
          active: false
        },
        projectDate: { startDate: startDate, endDate: endDate }
      };

      this.projectService.updateProject(projectId, updatedProjectData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Projet mis à jour',
            text: 'Le projet a été mis à jour avec succès.',
          });
          this.projectUpdated.emit();
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error updating project:', error);
          let errorMessage = 'Échec de la mise à jour du projet. Veuillez réessayer ultérieurement.';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          Swal.fire({
            icon: 'error',
            title: 'Erreur de mise à jour',
            text: errorMessage,
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulaire invalide',
        text: 'Le formulaire est invalide. Veuillez remplir tous les champs correctement.',
      });
    }
  }
}
