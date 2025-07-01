import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../model/Project.model';
import { UserserviceService } from '../services/userservice.service';
import { Processus } from '../model/Processus.model';
import { Kpi } from '../model/Kpi.model';
import { Client } from '../model/Client.model';
import { Activity } from '../model/activities.mosel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouterprojet',
  templateUrl: './ajouterprojet.component.html',
  styleUrls: ['./ajouterprojet.component.css']
})
export class AjouterprojetComponent implements OnInit {
  projectForm: FormGroup;
  processusList: Processus[] = [];
  kpiList: Kpi[] = [];
  clientList: Client[] = [];
  activityList: Activity[] = [];

  constructor(private projectService: UserserviceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initProjectForm();
    this.loadClientList();
    this.loadActivityList();
  }

  initProjectForm(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      processus: [[]],
      kpis: [[]],
      cli: [null, Validators.required],
      activityId: [null, Validators.required]
    });
  }

  formatDate(date: Date): string {
    if (!date) return ''; // Vérifie si la date est définie
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date); // Formatage de la date en format 'dd/MM/yyyy'
  }
  

  loadClientList(): void {
    this.projectService.getAllClients().subscribe(
      (clients: Client[]) => {
        this.clientList = clients;
        console.log('Client list loaded:', this.clientList);
      },
      (error: any) => {
        console.error('Error fetching client list:', error);
      }
    );
  }

  loadActivityList(): void {
    this.projectService.getActivities().subscribe(
      (activities: Activity[]) => {
        this.activityList = activities;
        console.log('Activity list loaded:', this.activityList);
      },
      (error) => {
        console.error('Error fetching activity list:', error);
      }
    );
  }

  onProcessusChange(): void {
    const selectedActivityId = this.projectForm.get('activityId').value;
    
    this.projectService.getProcessusByActivityId(selectedActivityId).subscribe(
      (processus: Processus[]) => {
        this.processusList = processus;
        console.log('Processus list loaded:', this.processusList);

        // Supprimer les KPIs actuellement sélectionnés
        this.projectForm.get('kpis').setValue([]);

        // Si un processus est sélectionné, chargez les KPIs associés à ce processus
        if (this.projectForm.get('processus').value.length > 0) {
          const selectedProcessusId = this.projectForm.get('processus').value[0]; // Supposons que vous ne sélectionnez qu'un seul processus
          this.loadKpiListByProcessusId(selectedProcessusId); // Appel à la méthode pour charger les KPIs
        }
      },
      (error) => {
        console.error('Error fetching processus for selected activity:', error);
      }
    );
  }

  loadKpiListByProcessusId(processusId: number): void {
    this.projectService.getKpisByProcessusIds([processusId]).subscribe(
      (kpis: Kpi[]) => {
        this.kpiList = kpis;
        console.log('Filtered KPI list loaded:', this.kpiList);
      },
      (error) => {
        console.error('Error fetching filtered KPI list:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      Swal.fire({
        title: 'Êtes-vous sûr de vouloir ajouter ce projet ?',
        text: 'Cette action est irréversible !',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = this.projectForm.value;
          const selectedProcessusIds: number[] = formData.processus;
          const selectedProcessus: Processus[] = selectedProcessusIds.map(id => ({ id: id, name: '', description: '' }));
          const newProject: Project = {
            name: formData.name,
            type: formData.type,
            startDate: formData.startDate,
            endDate: formData.endDate,
            projectDate: {
              startDate: formData.startDate,
              endDate: formData.endDate
            },
            processus: selectedProcessus,
            kpis: formData.kpis,
            cli: formData.cli,
            activity: { id: formData.activityId }
          };

          console.log('Attempting to create new project:', newProject);

          this.projectService.createProject(newProject).subscribe(
            (createdProject: Project) => {
              console.log('New project created:', createdProject);
              this.projectForm.reset();
            },
            (error) => {
              console.error('Error creating project:', error);
            }
          );
        }
      });
    }
  }
}
