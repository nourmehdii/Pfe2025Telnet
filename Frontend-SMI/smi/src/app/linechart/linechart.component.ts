import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { KpiHistory } from '../model/KpiHistory.model';
import { UserserviceService } from '../services/userservice.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  kpiHistory: KpiHistory[];
  kpiObjectif: number;
  @ViewChild('kpiChart') kpiChartRef: ElementRef;

  constructor(private userService: UserserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const kpiId = +params.get('id');
      this.loadKpiData(kpiId);
      this.loadKpiObjectif(kpiId);
    });
  }

  loadKpiData(kpiId: number): void {
    this.userService.getKpiHistoryByKpiId(kpiId).subscribe(
      kpiHistory => {
        // Sort kpiHistory by startDateP in ascending order
        this.kpiHistory = kpiHistory.sort((a, b) => new Date(a.startDateP).getTime() - new Date(b.startDateP).getTime());
        this.createChart();
      },
      error => {
        console.error('Error fetching KPI history:', error);
      }
    );
  }

  loadKpiObjectif(kpiId: number): void {
    this.userService.getKpiObjectifById(kpiId).subscribe(
      objectif => {
        this.kpiObjectif = objectif;
        this.createChart();
      },
      error => {
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
    this.kpiHistory.forEach(history => {
      const startDate = new Date(history.startDateP);
      const endDate = new Date(history.endDateP);
  
      // Construire les libellés de date au format "Mois Année"
      const startLabel = startDate.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
      const endLabel = endDate.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  
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
        'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
        'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
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
            data: Array.from({ length: dateLabels.length }).fill(this.kpiObjectif),
            borderColor: 'green',
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fond blanc avec transparence
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
            text: 'Évolution du KPI par rapport à l\'objectif'
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
                if (value === 0 || value === 25 || value === 50 || value === 75 || value === 100) {
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
