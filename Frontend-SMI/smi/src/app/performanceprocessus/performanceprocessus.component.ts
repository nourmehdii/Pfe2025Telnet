import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';
import { Kpi } from '../model/Kpi.model';
import { KpiHistory } from '../model/KpiHistory.model';
import { MatDialog } from '@angular/material/dialog';
import { UpdatelatesthistoryComponent } from '../updatelatesthistory/updatelatesthistory.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Processus } from '../model/Processus.model';
import { Activity } from '../model/activities.mosel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjouterresultatkpiComponent } from '../ajouterresultatkpi/ajouterresultatkpi.component';
import { ModifierresultkpiComponent } from '../modifierresultkpi/modifierresultkpi.component';

@Component({
  selector: 'app-performanceprocessus',
  templateUrl: './performanceprocessus.component.html',
  styleUrls: ['./performanceprocessus.component.css']
})
export class PerformanceprocessusComponent implements OnInit {
  kpis: Kpi[];
  latestKpiHistories: { [key: number]: KpiHistory };
  activities: Activity[];
  selectedActivity: string = 'all';
  selectedProcessusType: string = 'all';
  processus: Processus[];
  filteredKpis: Kpi[];
  kpiValues: { [key: number]: number } = {};
  p: number = 1;
  form: FormGroup;
  selectedProcessus: string;
  addedValue: number; 
  endDateP: Date;
  startDateP: Date;
  projectDetails: any;
  projectName: string;
  activity: string;
  client: string;

  constructor(private service: UserserviceService, 
              private projectService: UserserviceService,  // Injecter le service de projet
              public dialog: MatDialog,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startDateP: [new Date(), Validators.required],
      endDateP: [new Date(), Validators.required]
    });

    this.form.get('startDateP').valueChanges.subscribe((value: Date) => {
        this.startDateP = value;
    });

    this.form.get('endDateP').valueChanges.subscribe((value: Date) => {
        this.endDateP = value;
    });

    this.getKpiList();
    this.getActivities();
    this.getProcessusList();
  }

  shouldDisableButton(): boolean {
    const selectedProcessusId = Number(this.selectedProcessusType);
    const selectedProcess = this.processus.find(process => process.id === selectedProcessusId);
    if (selectedProcess && (selectedProcess.name === 'OQM' || selectedProcess.name === 'RCT')) {
        return false;
    } else {
        return true;
    }
  }

  getKpiList(): void {
    this.service.getKpiList().subscribe(
      kpis => {
        this.kpis = kpis;
        this.filteredKpis = kpis;
        this.loadKpiValues();
        this.getLatestKpiHistories();
      },
      error => {
        console.error('Error retrieving KPI list:', error);
      }
    );
  }

  loadKpiValues(): void {
    this.filteredKpis.forEach((kpi) => {
      this.service.getKpiValueById(kpi.id).subscribe(
        (value: number) => {
          this.kpiValues[kpi.id] = value;
        },
        (error) => {
          console.error('Error fetching KPI value:', error);
        }
      );
    });
  }

  getLatestKpiHistories(): void {
    const requests: Observable<any>[] = [];
    this.latestKpiHistories = {};

    this.kpis.forEach(kpi => {
      requests.push(this.service.getLatestKpiHistory(kpi.id));
    });

    forkJoin(requests).subscribe(
      (histories: KpiHistory[]) => {
        histories.forEach((history, index) => {
          this.latestKpiHistories[this.kpis[index].id] = history || ({} as KpiHistory);
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error retrieving latest histories:', error);
      }
    );
  }

  getProjectDetailsbykpi(kpiId: number): void {
    this.projectService.getProjectsByKpi(kpiId)
      .subscribe(
        (projectDetails: any) => {
          this.projectDetails = projectDetails;
          this.projectName = projectDetails.name;
          this.activity = projectDetails.activity;
          this.client = projectDetails.client;
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du projet :', error);
        }
      );
  }

  openModifierKpiHistoryModal(kpiId: number): void {
    const history = this.latestKpiHistories[kpiId];
    if (!history || !('id' in history)) {
      console.error('History or historyId not found for KPI ID:', kpiId);
      return;
    }

    const historyId = history.id;

    const dialogRef = this.dialog.open(UpdatelatesthistoryComponent, {
      width: '400px',
      data: { historyId: historyId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getKpiList();
    });
  }

  getActivities(): void {
    this.service.getActivities().subscribe(
      activities => {
        this.activities = activities;
      },
      error => {
        console.error('Error retrieving activities:', error);
      }
    );
  }

  filterKpiByActivity(): void {
    if (this.selectedActivity === 'all') {
      this.filteredKpis = this.kpis;
    } else {
      this.service.getKpisByActivityId(parseInt(this.selectedActivity)).subscribe(
        kpis => {
          this.filteredKpis = kpis;
        },
        error => {
          console.error('Error retrieving KPIs by activity:', error);
        }
      );
    }
  }

  filterKpisByDateRange(): void {
    const startDate: Date = new Date(this.form.get('startDateP').value);
    const endDate: Date = new Date(this.form.get('endDateP').value);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Start Date or End Date is not valid.');
        return;
    }

    this.service.getLatestKpiNamesBetweenDates(startDate, endDate).subscribe(
      (kpiNames: string[]) => {
          console.log('KPI names returned from backend:', kpiNames);
          this.filteredKpis = this.kpis.filter(kpi => kpiNames.includes(kpi.name));
      },
      (error: any) => {
          console.error('Error fetching KPI names between dates:', error);
      }
  );
  
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  isFormValid(): boolean {
    if (this.selectedProcessus === 'QQM' || this.selectedProcessus === 'RCT') {
      return this.form.valid;
    } else {
      return true;
    }
  }

  openDialogg(kpiId: number): void {
    const dialogRef = this.dialog.open(AjouterresultatkpiComponent, {
      width: '600px',
      data: { kpiId: kpiId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fermé avec résultat :', result);
      this.loadKpiValues();
    });
  }

  onFilterButtonClick(): void {
    this.filterKpisByDateRange();
  }

  editValue(kpiId: number): void {
    const dialogRef = this.dialog.open(ModifierresultkpiComponent, {
      width: '600px',
      data: { kpiId: kpiId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fermé avec résultat :', result);
      this.loadKpiValues();
    });
  }

  getProcessusList(): void {
    this.service.getProcessusList().subscribe(
      processus => {
        this.processus = processus;
      },
      error => {
        console.error('Error retrieving processus list:', error);
      }
    );
  }

  filterKpiByProcessus(): void {
    if (this.selectedProcessusType === 'all') {
      this.getKpiList();
    } else {
      const processusId = parseInt(this.selectedProcessusType);
      this.service.getKpisByProcessusIds([processusId]).subscribe(
        kpis => {
          this.filteredKpis = kpis;
        },
        error => {
          console.error('Error retrieving filtered KPIs:', error);
        }
      );
    }
  }

  onProcessusSelectionChange(): void {
    this.filterKpiByProcessus();
  }
}
