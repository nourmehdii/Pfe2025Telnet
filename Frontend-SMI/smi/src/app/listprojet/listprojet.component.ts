import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserserviceService } from '../services/userservice.service';
import { Project } from '../model/Project.model';
import { AjouterprojetComponent } from '../ajouterprojet/ajouterprojet.component';
import Swal from 'sweetalert2';
import { ModifierprojectComponent } from '../modifierproject/modifierproject.component';
import { Router } from '@angular/router';
import { Activity } from '../model/activities.mosel';
import  jsPDF  from 'jspdf';
import autoTable, { Styles } from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-listprojet',
  templateUrl: './listprojet.component.html',
  styleUrls: ['./listprojet.component.css']
})
export class ListprojetComponent implements OnInit {
  projects: Project[]; // Variable pour stocker la liste des projets
  projectId:number;
  selectedActivity: string = ''; // Activité sélectionnée
  activities: Activity[]; // Liste des activités
  filteredProjects: Project[];
  tableRows: any[] = [];
  selectedOption: string; 
  p: number = 1;

  
  constructor(private dialog: MatDialog, private userService: UserserviceService,private router: Router) { }

  ngOnInit(): void {
    this.getProjectList(); // Chargez la liste de tous les projets lors de l'initialisation du composant
    this.loadActivities(); // Chargez la liste des activités lors de l'initialisation du composant
  }
  filterProjectsByActivity(): void {
    if (!this.selectedActivity) {
      this.filteredProjects = this.projects; // Affichez tous les projets si aucune activité n'est sélectionnée
    } else {
      this.filteredProjects = this.projects.filter(project => {
        // Vérifiez que project.activity est défini avant d'accéder à project.activity.id
        return project.activity && project.activity.id && project.activity.id.toString() === this.selectedActivity;
      });
    }
  }
  

  openAjouterprojetModal(): void {
    const dialogRef = this.dialog.open(AjouterprojetComponent, {
      width: '500px',
      // d'autres options de modal peuvent être spécifiées ici
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Rechargez la liste des projets après la fermeture du dialogue
      this.getProjectList();
    });
  }
  
  formatDate(date: Date): string {
    if (!date) return ''; // Vérifie si la date est définie
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('fr-FR', options).format(date); // Formatage de la date en format 'dd/MM/yyyy'
  }

  getProjectList(): void {
    this.userService.getProjectList().subscribe(
      (projects: Project[]) => {
        this.projects = projects; // Assignez la liste des projets à la variable
        this.filteredProjects = projects; // Initialisez également les projets filtrés avec tous les projets au début
        console.log('Liste des projets:', this.projects);
        
        // Une fois que la liste des projets est récupérée, pour chaque projet, appelez la méthode getActivitiesByProjectId
        this.projects.forEach(project => {
          this.getActivitiesByProjectId(project.id);
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des projets:', error);
      }
    );
  }
  
  getActivitiesByProjectId(projectId: number): void {
    this.userService.getActivitiesByProjectId(projectId).subscribe(
      (activities: string[]) => {
        console.log('Activités associées au projet', activities);
        // Mapper les chaînes en instances d'Activity
        const mappedActivities: Activity[] = activities.map(activityName => ({ id: 0, name: activityName, description: '' }));
        // Recherchez le projet correspondant dans la liste des projets
        const project = this.projects.find(proj => proj.id === projectId);
        if (project) {
          // Assignez les activités mappées au projet
          project.activities = mappedActivities;
        } else {
          console.error('Projet non trouvé:', projectId);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des activités associées au projet:', error);
      }
    );
  }
  

  loadActivities(): void {
    this.userService.getActivities().subscribe(
      (activities: Activity[]) => {
        this.activities = activities; // Affectez les activités récupérées à la variable
      },
      (error) => {
        console.error('Erreur lors de la récupération de la liste des activités:', error);
      }
    );
  }

  getProcessusByProjectId(projectId: number): void {
    this.userService.getProcessusByProjectId(projectId).subscribe(
      (processus: any) => {
        console.log('Processus associés au projet', processus);
        // Vous pouvez affecter les processus récupérés à une propriété de votre modèle de vue ici
      },
      (error) => {
        console.error('Erreur lors de la récupération des processus associés au projet:', error);
      }
    );
  }

  deleteProject(projectId: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment supprimer ce projet?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteProject(projectId).subscribe(
          () => { // <-- Supprimer le traitement de la réponse ici
            Swal.fire(
              'Supprimé!',
              'Le projet a été supprimé avec succès.',
              'success'
            ).then(() => {
              // Rechargez la liste des projets après la suppression
              this.getProjectList();
            });
          },
          (error) => {
            console.error('Erreur lors de la suppression du projet:', error);
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression du projet.',
              'error'
            );
          }
        );
      }
    });
  }
  navigateToProjectDetails(id: number) {
    this.router.navigate(['/projetsdetails', id]);
  }
  
  openUpdateProjectModal(projectId: number): void {
    const dialogRef = this.dialog.open(ModifierprojectComponent, {
      width: '500px',
      data: { projectId: projectId } // Assurez-vous que projectId est correctement passé ici
    });
  
    dialogRef.componentInstance.projectUpdated.subscribe(() => {
      this.getProjectList(); // Rechargez la liste des projets après la mise à jour
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Vous pouvez ajouter un traitement supplémentaire après la fermeture de la modal ici
    });
  }
  

  downloadPDF(): void {
    const doc = new jsPDF();
    
    // Style pour le titre
    const titleText = 'Liste des Projets';
    const titleFontSize = 18;
    const titleX = 15; // Position X du titre (aligné à gauche)
    const titleY = 25;
    doc.setFontSize(titleFontSize);
    doc.setTextColor(40);
    doc.setFont('helvetica', 'bold'); // Utilisation de la police "helvetica" en gras pour le titre
    doc.text(titleText, titleX, titleY);
  
    // Configuration de la taille du logo
    const logoWidth = 25; // Largeur du logo
    const logoHeight = 25; // Hauteur du logo
    
    // Position du logo en haut à droite de la page
    const logoMarginRight = 15; // Marge droite pour le logo
    const logoMarginTop = 10; // Marge supérieure pour le logo
  
    // Calcul de la position X du logo
    const logoX = doc.internal.pageSize.getWidth() - logoWidth - logoMarginRight;
    
    // Ajout du logo Telnet en haut à droite de la page
    doc.addImage('assets/images/LogoTelnet.png', 'PNG', logoX, logoMarginTop, logoWidth, logoHeight);
  
    // Configuration du tableau
    const tableRows: any[][] = [];
    const headers = ['Nom', 'Type', 'Date de début', 'Date de fin', 'Processus', 'Activités', 'Client'];
  
    // Remplissage des données du tableau
    this.projects.forEach(project => {
      const projectData = [
        project.name ?? 'N/A', // Utilisation de 'N/A' si project.name est undefined
        project.type ?? 'N/A', // Utilisation de 'N/A' si project.type est undefined
        new Date(project.projectDate?.startDate ?? '').toLocaleDateString() || 'N/A', // Vérifiez que startDate existe
        new Date(project.projectDate?.endDate ?? '').toLocaleDateString() || 'N/A', // Vérifiez que endDate existe
        (project.processus ?? []).map(p => p.name).join(', '), // Vérifiez que processus existe
        (project.activities ?? []).map(a => a.name).join(', '), // Vérifiez que activities existe
        project.cli?.name ?? 'N/A' // Vérifiez que cli existe
      ];
      tableRows.push(projectData);
    });
  
    // Génération du tableau avec AutoTable
    autoTable(doc, {
      head: [headers],
      body: tableRows,
      startY: titleY + titleFontSize + 10, // Positionnez le tableau sous le titre avec un espace de 10 unités
      theme: 'grid', // Utilisation d'un thème de tableau avec des bordures
      styles: {
        fontSize: 10, // Taille de la police du texte du tableau
        cellPadding: 3,
        valign: 'middle', // Alignement vertical du texte dans les cellules
        halign: 'center', // Alignement horizontal du texte dans les cellules
        lineWidth: 0.2, // Epaisseur des lignes de bordure du tableau (plus mince)
      },
      columnStyles: {
        0: { fontStyle: 'bold' }, // Style pour la première colonne (Nom)
      },
      margin: { top: 25 } // Ajoutez un peu plus d'espace au-dessus du tableau
    });
  
    // Sauvegarde du document PDF
    doc.save('project_list.pdf');
  }
  

  exportToExcel(): void {
    // Nom des colonnes dans le fichier Excel
    const headers = ['Nom', 'Type', 'Date de début', 'Date de fin', 'Processus', 'Activités', 'Client'];
  
    // Assurez-vous que this.projects est défini et est un tableau
    if (!Array.isArray(this.projects)) {
      console.error('Les projets ne sont pas définis ou ne sont pas un tableau:', this.projects);
      return;
    }
  
    // Données à exporter
    const data = this.projects.map(project => [
      project.name || '', // Valeur par défaut si undefined
      project.type || '', // Valeur par défaut si undefined
      project.projectDate?.startDate ? new Date(project.projectDate.startDate).toLocaleDateString() : '', // Valeur par défaut si undefined
      project.projectDate?.endDate ? new Date(project.projectDate.endDate).toLocaleDateString() : '', // Valeur par défaut si undefined
      project.processus?.map(p => p.name).join(', ') || '', // Valeur par défaut si undefined
      project.activities?.map(a => a.name).join(', ') || '', // Valeur par défaut si undefined
      project.cli?.name || '' // Valeur par défaut si undefined
    ]);
  
    // Créer un nouveau classeur Excel
    const workbook = XLSX.utils.book_new();
  
    // Créer une nouvelle feuille dans le classeur
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  
    // Ajouter la feuille au classeur
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Liste des Projets');
  
    // Générer le blob du fichier Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Créer un blob à partir du buffer Excel
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    // Nom du fichier Excel
    const fileName = 'project_list.xlsx';
  
    // Création d'un lien pour le téléchargement
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', fileName);
  
    // Ajout du lien au corps du document
    document.body.appendChild(downloadLink);
  
    // Clic sur le lien pour déclencher le téléchargement
    downloadLink.click();
  
    // Suppression du lien du corps du document après le téléchargement
    document.body.removeChild(downloadLink);
  }
  

handleDownload(option: string): void {
  if (option === 'pdf') {
      this.downloadPDF();
  } else if (option === 'excel') {
      this.exportToExcel();
  }
}

}

  
  
  
  
