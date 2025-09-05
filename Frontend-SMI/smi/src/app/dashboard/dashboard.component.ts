import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { RisqueService } from '../services/risque.service';
import { OpportuniteService } from '../services/opportunite.service';
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

  // Pour Risques / Opportunités
  risqueCount: number = 0;
  opportuniteCount: number = 0;

  constructor(
    private projectService: UserserviceService,
    private analyseService: UserserviceService,
    private risqueService: RisqueService,
    private opportuniteService: OpportuniteService
  ) { }

  ngOnInit(): void {
    this.getTotalProjetsParClient();
    this.getAnalyseCountAndCreateChartForAllProjects();
    this.getTotalProjetsParType();
    this.createPieChart();

    // Charger Risques et Opportunités
    this.loadRisquesEtOpportunites();
  }

  // ------------------ Projets / Analyses ------------------
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
        (error: any) => { console.error(error); }
      );
  }

  getTotalProjetsParType(): void {
    this.projectService.getTotalProjetsParType()
      .subscribe(
        (data: Map<string, number>) => {
          this.projectCountByType = Array.from(data.entries()).map(([type, count]) => ({ type, count }));
          this.createPieChart();
        },
        (error: any) => { console.error(error); }
      );
  }

  createBarChart(): void {
    const canvas: any = document.getElementById('bar-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const labels = this.totalProjetsParClient.map(item => item.client);
    const data = this.totalProjetsParClient.map(item => item.count);

    new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Total projets par client', data, backgroundColor: '#22a4D9' }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  getAnalyseCountAndCreateChartForAllProjects(): void {
    this.projectService.getProjectList()
      .subscribe(
        (projects: any[]) => {
          projects.forEach(project => {
            this.analyseService.countAnalysesForProject(project.id)
              .subscribe(count => {
                this.analyseCountsByProject.push({ projectId: project.id, count });
                if (this.analyseCountsByProject.length === projects.length) {
                  this.createDoughnutChart();
                }
              });
          });
        }
      );
  }

  createDoughnutChart(): void {
    const canvas: any = document.getElementById('doughnut-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const labels = ['Projet 1', 'Projet 2', 'Projet 3', 'Projet 4'];
    const data = [6, 4, 3, 2];

    new Chart(ctx, {
      type: 'doughnut',
      data: { labels, datasets: [{ data, backgroundColor: ['#22a4D9', '#187398', '#C5ECF6', '#1e1666'] }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  createPieChart(): void {
    const canvas: any = document.getElementById('pie-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const labels = ['Régie', 'Forfait'];
    const data = [4, 2];

    const gradientRegie = ctx.createLinearGradient(0, 0, 200, 200);
    gradientRegie.addColorStop(0, '#22a4D9');
    gradientRegie.addColorStop(1, '#c5ecf6');

    const gradientForfait = ctx.createLinearGradient(0, 0, 200, 200);
    gradientForfait.addColorStop(0, '#187398');
    gradientForfait.addColorStop(1, '#1e1666');

    new Chart(ctx, {
      type: 'pie',
      data: { labels, datasets: [{ data, backgroundColor: [gradientRegie, gradientForfait] }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }

  // ------------------ Risques / Opportunités ------------------
  loadRisquesEtOpportunites(): void {
    let risquesLoaded = false;
    let opportunitesLoaded = false;

    this.risqueService.getRisques().subscribe(data => {
      this.risqueCount = data.length;
      risquesLoaded = true;
      if (risquesLoaded && opportunitesLoaded) this.createRisquesOpportunitesChart();
    });

    this.opportuniteService.getOpportunites().subscribe(data => {
      this.opportuniteCount = data.length;
      opportunitesLoaded = true;
      if (risquesLoaded && opportunitesLoaded) this.createRisquesOpportunitesChart();
    });
  }

  createRisquesOpportunitesChart(): void {
    const canvas: any = document.getElementById('risques-opportunites-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const labels = ['Risques', 'Opportunités'];
    const data = [this.risqueCount, this.opportuniteCount];

    const gradientRisques = ctx.createLinearGradient(0, 0, 200, 200);
    gradientRisques.addColorStop(0, '#22a4D9');
    gradientRisques.addColorStop(1, '#c5ecf6');

    const gradientOpportunites = ctx.createLinearGradient(0, 0, 200, 200);
    gradientOpportunites.addColorStop(0, '#187398');
    gradientOpportunites.addColorStop(1, '#1e1666');

    new Chart(ctx, {
      type: 'pie',
      data: { labels, datasets: [{ data, backgroundColor: [gradientRisques, gradientOpportunites] }] },
      options: { responsive: true, maintainAspectRatio: false }
    });
  }
}
