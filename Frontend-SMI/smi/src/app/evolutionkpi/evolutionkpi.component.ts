import { KpiHistory } from '../model/KpiHistory.model';
import Chart from 'chart.js/auto';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmailModalComponent } from '../email-modal/email-modal.component';
import * as XLSX from 'xlsx'; // Importer xlsx pour la génération de fichiers Excel
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import jsPDF from 'jspdf';
import { Kpi } from '../model/Kpi.model';

@Component({
  selector: 'app-evolutionkpi',
  templateUrl: './evolutionkpi.component.html',
  styleUrls: ['./evolutionkpi.component.css']
})
export class EvolutionkpiComponent implements OnInit {
  kpiHistory: KpiHistory[];
  kpiObjectif: number;
  startDateLabels: string[] = [];
  endDateLabels: string[] = [];
  kpiName: string = '';
  kpi: Kpi; // Déclarer une propriété kpi de type Kpi

  @ViewChild('kpiChart') kpiChartRef: ElementRef;

  constructor(
    private userService: UserserviceService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const kpiId = +params.get('id');

      // Charger les données du KPI
      this.loadKpiData(kpiId);

      // Charger l'objectif du KPI
      this.loadKpiObjectif(kpiId);

      // Appeler un service pour obtenir le nom du KPI à partir de kpiId
      this.fetchKpiNameById(kpiId.toString()); // Convertir kpiId en string
    });
  }

  loadKpiData(kpiId: number): void {
    this.userService.getKpiHistoryByKpiId(kpiId).subscribe(
      (kpiHistory) => {
        // Trier l'historique du KPI par date de début
        this.kpiHistory = kpiHistory.sort(
          (a, b) =>
            new Date(a.startDateP).getTime() - new Date(b.startDateP).getTime()
        );
        this.createChart();
      },
      (error) => {
        console.error('Error fetching KPI history:', error);
      }
    );
  }

  loadKpiObjectif(kpiId: number): void {
    this.userService.getKpiObjectifById(kpiId).subscribe(
      (objectif) => {
        this.kpiObjectif = objectif;
        this.createChart();
      },
      (error) => {
        console.error('Error fetching KPI objectif:', error);
      }
    );
  }

  createChart(): void {
    if (!this.kpiHistory || !this.kpiObjectif) {
      console.error('KPI history or objectif not available.');
      return;
    }

    const ctx = document.getElementById('kpiChart') as HTMLCanvasElement;

    const data: number[] = [];
    let dateLabels: string[] = [];
    const uniqueDateSet: Set<string> = new Set(); // Utiliser un ensemble pour stocker les dates uniques

    // Parcourir l'historique du KPI
    this.kpiHistory.forEach((history) => {
      const startDate = new Date(history.startDateP);
      const endDate = new Date(history.endDateP);

      // Construire les libellés de date au format "Mois Année"
      const startLabel = startDate.toLocaleDateString('fr-FR', {
        month: 'short',
        year: 'numeric'
      });
      const endLabel = endDate.toLocaleDateString('fr-FR', {
        month: 'short',
        year: 'numeric'
      });

      // Vérifier si la date de début n'est pas déjà ajoutée à l'ensemble
      if (!uniqueDateSet.has(startLabel)) {
        dateLabels.push(startLabel);
        uniqueDateSet.add(startLabel); // Ajouter la date à l'ensemble
      }

      // Vérifier si la date de fin n'est pas déjà ajoutée à l'ensemble
      if (!uniqueDateSet.has(endLabel)) {
        dateLabels.push(endLabel);
        uniqueDateSet.add(endLabel); // Ajouter la date à l'ensemble
      }

      data.push(history.value);
    });

    // Trier les libellés de date de manière croissante en utilisant le mois et l'année
    dateLabels = dateLabels.sort((a, b) => {
      const [monthA, yearA] = a.split(' ');
      const [monthB, yearB] = b.split(' ');

      // Comparaison basée sur l'année
      if (yearA !== yearB) {
        return parseInt(yearA) - parseInt(yearB);
      }
      // Si les années sont égales, comparer les mois
      const monthOrder: { [key: string]: number } = {
        jan: 1,
        feb: 2,
        mar: 3,
        apr: 4,
        may: 5,
        jun: 6,
        jul: 7,
        aug: 8,
        sep: 9,
        oct: 10,
        nov: 11,
        dec: 12
      };

      return monthOrder[monthA.toLowerCase()] - monthOrder[monthB.toLowerCase()];
    });

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dateLabels,
        datasets: [
          {
            label: 'Évolution du KPI',
            data: data,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)',
            borderWidth: 2,
            fill: true, // Remplir le fond du graphique
            tension: 0.4
          },
          {
            label: 'Objectif',
            data: Array.from({ length: dateLabels.length }).fill(
              this.kpiObjectif
            ),
            borderColor: 'green',
            backgroundColor: 'rgba(0, 200, 0, 0.2)', // Fond vert avec transparence
            borderWidth: 2,
            fill: true, // Remplir le fond du graphique
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Évolution du KPI par rapport à l'objectif"
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 25,
              callback: (value) => {
                if (
                  value === 0 ||
                  value === 25 ||
                  value === 50 ||
                  value === 75 ||
                  value === 100
                ) {
                  return value.toString();
                } else {
                  return '';
                }
              }
            },
            title: {
              display: true,
              text: 'Valeurs'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Période (Mois Année)'
            }
          }
        }
      }
    });

    // Ajoutez un gestionnaire d'événements au canvas pour détecter un double-clic
    ctx.addEventListener('dblclick', () => {
      this.openEmailModal(); // Ouvrez la modal pour envoyer l'e-mail
    });
  }

  openEmailModal(): void {
    const emailContent = this.generateEmailBody();
  
    const dialogRef = this.dialog.open(EmailModalComponent, {
      width: '400px',
      data: { subject: 'Rapport KPI' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result === 'send') {
        const emailPayload = {
          to: 'hadilkacem7@gmail.com', // Adresse e-mail du responsable qualité
          subject: 'Rapport KPI',
          body: emailContent.body,
          attachment: emailContent.attachment
        };
        this.sendEmailToQualityManager(emailPayload); // Envoyer l'e-mail au responsable qualité
      }
    });
  }
  
  fetchKpiNameById(kpiId: string): void {
    // Appel à votre service pour récupérer le nom du KPI à partir de son ID
    this.userService.getKpiById(+kpiId).subscribe(
      (kpi) => {
        this.kpi = kpi;
        this.kpiName = kpi.name; // Mettre à jour le nom du KPI une fois récupéré
      },
      (error) => {
        console.error('Error fetching KPI name:', error);
      }
    );
  }

  generateEmailBody(): { body: string; attachment: { filename: string; content: string } } {
    // Générer le contenu du corps de l'e-mail
    let body = 'Bonjour,\n\n';
    body += 'Veuillez trouver ci-joint le rapport KPI.\n\n';
  
    body += `Nom du KPI: ${this.kpiName}\n\n`;
  
    body += `Objectif KPI: ${this.kpiObjectif}\n\n`;
  
    body += 'Analyse de l\'évolution du KPI par rapport à l\'objectif:\n';
    body += '-----------------------------------------------------\n';
  
    this.kpiHistory.forEach((history) => {
      const startLabel = new Date(history.startDateP).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
      const endLabel = new Date(history.endDateP).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  
      const deviation = history.value - this.kpiObjectif;
      const trend = deviation > 0 ? 'au-dessus' : deviation < 0 ? 'en-dessous' : 'atteint';
  
      body += `${startLabel} - ${endLabel}: ${history.value} (${trend} de l'objectif par ${Math.abs(deviation)})\n`;
    });
  
    // Générer le fichier PDF
    const pdf = new jsPDF();
    pdf.text(body, 10, 10); // Ajouter le contenu du corps de l'e-mail dans le PDF
    const pdfContent = pdf.output('datauristring'); // Convertir le PDF en une chaîne de données URI
  
    // Préparer la pièce jointe PDF pour l'e-mail
    const attachment = {
      filename: 'rapport_kpi.pdf',
      content: pdfContent.split(',')[1] // Extraire seulement les données du PDF (enlever le préfixe 'data:application/pdf;base64,')
    };
  
    return { body: body, attachment: attachment };
  }

  // Fonction pour envoyer l'email au responsable qualité
  sendEmailToQualityManager(emailPayload: { to: string; subject: string; body: string; attachment: { filename: string; content: string } }): void {
    this.userService.sendEmail(emailPayload.to, emailPayload.subject, emailPayload.body).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
        // Affichez un message de succès à l'utilisateur si nécessaire
      },
      (error) => {
        console.error('Error sending email:', error);
        // Gérez l'erreur et affichez un message à l'utilisateur si nécessaire
      }
    );
  }

  generatePDF(): void {
    const pdf = new jsPDF();

    // Générer le titre du document
    pdf.text(`Rapport KPI - ${this.kpiName}`, 10, 10);

    // Générer le contenu du rapport
    let y = 30;
    pdf.text(`Objectif KPI: ${this.kpiObjectif}`, 10, y);
    y += 10;
    pdf.text('Analyse de l\'évolution du KPI par rapport à l\'objectif:', 10, y);
    y += 5;
    pdf.text('-----------------------------------------------------', 10, y);
    y += 5;

    this.kpiHistory.forEach((history) => {
      const startLabel = new Date(history.startDateP).toLocaleDateString(
        'fr-FR',
        { month: 'short', year: 'numeric' }
      );
      const endLabel = new Date(history.endDateP).toLocaleDateString('fr-FR', {
        month: 'short',
        year: 'numeric'
      });

      const deviation = history.value - this.kpiObjectif;
      const trend = deviation > 0 ? 'au-dessus' : deviation < 0 ? 'en-dessous' : 'atteint';

      const text = `${startLabel} - ${endLabel}: ${history.value} (${trend} de l'objectif par ${Math.abs(deviation)})`;
      pdf.text(text, 10, y);
      y += 5;
    });

    // Télécharger le PDF
    pdf.save('rapport_kpi.pdf');
  }

  downloadChart(): void {
    const canvas = document.getElementById('kpiChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found.');
      return;
    }
    canvas.toBlob((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'evolution_kpi.jpg';
      link.click();
      window.URL.revokeObjectURL(url);
    }, 'image/jpeg');
  }
}
