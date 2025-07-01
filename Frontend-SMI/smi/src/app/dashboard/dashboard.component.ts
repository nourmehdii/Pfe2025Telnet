import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import 'chartjs-plugin-datalabels';

declare var Chart: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projectCountByType: { type: string, count: number }[] = [];
  totalProjetsParClient: { client: string, count: number }[] = [];
  analyseCountsByProject: { projectId: number, count: number }[] = [];
  

  constructor(
    private projectService: UserserviceService,
    private analyseService: UserserviceService
  ) { }

  ngOnInit(): void {
    this.getTotalProjetsParClient();
    this.getAnalyseCountAndCreateChartForAllProjects();
    this.getTotalProjetsParType();
    this.createPieChart();
  }

  getTotalProjetsParClient(): void {
    this.projectService.getTotalProjetsParClient()
      .subscribe(
        (data: any[]) => {
          this.totalProjetsParClient = data.map(item => ({
            client: item[0],
            count: item[1]
          }));
          this.createBarChart();
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des total projets par client:', error);
        }
      );
  }

  getTotalProjetsParType(): void {
    this.projectService.getTotalProjetsParType()
      .subscribe(
        (data: Map<string, number>) => {
          console.log('Data received for pie chart:', data); // Vérifiez les données reçues
          this.projectCountByType = Array.from(data.entries()).map(([type, count]) => ({ type, count }));
          this.createPieChart(); // Appel pour créer le graphique après la récupération des données
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des projets par type:', error);
        }
      );
  }

  createBarChart(): void {
    const canvas: any = document.getElementById('bar-chart');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Context of bar-chart canvas not found');
      return;
    }
  
    const labels = this.totalProjetsParClient.map(item => item.client);
    const data = this.totalProjetsParClient.map(item => item.count);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total projets par client',
          data: data,
          backgroundColor: (context: any) => {
            const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, '#22a4D9'); // Bleu clair
            gradient.addColorStop(1, '#187398'); // Bleu foncé
            return gradient;
          },
          borderRadius: 8, // coins arrondis
          hoverBackgroundColor: '#1e1666',
          borderSkipped: false // évite l'effet de bord dur
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#444', // Couleur du texte sur l’axe Y
              font: {
                size: 12,
                weight: '500'
              }
            },
            grid: {
              drawBorder: false,
              color: '#e0e0e0'
            }
          },
          x: {
            ticks: {
              color: '#444',
              font: {
                size: 12,
                weight: '500'
              }
            },
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1e1666',
            titleFont: { size: 13 },
            bodyFont: { size: 12 }
          },
          datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: (value: any) => value,
            color: '#1e1666',
            font: {
              weight: 'bold',
              size: 11
            }
          }
        }
      },
    });
  }
  

  getAnalyseCountAndCreateChartForAllProjects(): void {
    this.projectService.getProjectList()
      .subscribe(
        (projects: any[]) => {
          projects.forEach(project => {
            this.analyseService.countAnalysesForProject(project.id)
              .subscribe(
                (count: number) => {
                  this.analyseCountsByProject.push({ projectId: project.id, count: count });
                  if (this.analyseCountsByProject.length === projects.length) {
                    this.createDoughnutChart();
                  }
                },
                (error: any) => {
                  console.error('Erreur lors de la récupération du nombre d\'analyses pour le projet:', error);
                }
              );
          });
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des projets:', error);
        }
      );
  }

  createDoughnutChart(): void {
    const canvas: any = document.getElementById('doughnut-chart');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Context of doughnut-chart canvas not found');
      return;
    }
  
    // 🔒 Données statiques temporaires pour l’affichage
    const labels = ['Projet 1', 'Projet 2', 'Projet 3', 'Projet 4'];
    const data = [6, 4, 3, 2];
  
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#22a4D9', '#187398', '#C5ECF6', '#1e1666'
          ],
          hoverBackgroundColor: [
            '#187398', '#22a4D9', '#A0DFF4', '#282066'
          ],
          borderColor: '#fff',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '55%',
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: '#333',
              padding: 12,
              font: {
                size: 12,
                family: 'Poppins',
                weight: '500'
              }
            }
          },
          tooltip: {
            backgroundColor: '#1e1666',
            titleColor: '#fff',
            bodyColor: '#fff'
          },
          datalabels: {
            formatter: (value: number, context: any) => {
              const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1) + '%';
              return percentage;
            },
            color: '#fff',
            font: {
              size: 11,
              weight: 'bold'
            }
          }
        }
      },
    });
  }
  

  createPieChart(): void {
    const canvas: any = document.getElementById('pie-chart');
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Context of pie-chart canvas not found');
      return;
    }
  
    const labels = ['Régie', 'Forfait'];
    const data = [4, 2];
  
    // 🎨 Création de dégradés élégants
    const gradientRegie = ctx.createLinearGradient(0, 0, 200, 200);
    gradientRegie.addColorStop(0, '#22a4D9');
    gradientRegie.addColorStop(1, '#c5ecf6');
  
    const gradientForfait = ctx.createLinearGradient(0, 0, 200, 200);
    gradientForfait.addColorStop(0, '#187398');
    gradientForfait.addColorStop(1, '#1e1666');
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [gradientRegie, gradientForfait],
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateScale: true,
          duration: 1000,
          easing: 'easeOutQuint' // ✨ Animation fluide
        },
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: '#333',
              font: {
                family: 'Segoe UI, sans-serif', // ✅ Typo élégante
                size: 12,
                weight: '600'
              },
              usePointStyle: true,
              padding: 16
            }
          },
          datalabels: {
            formatter: (value: any) => {
              const total = data.reduce((a: number, b: number) => a + b, 0);
              return ((value / total) * 100).toFixed(1) + '%';
            },
            color: '#fff',
            font: {
              family: 'Segoe UI',
              weight: 'bold',
              size: 13
            },
            textShadowBlur: 4,
            textShadowColor: '#000'
          }
        }
      },
    });
  }
  
  
}
