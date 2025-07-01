import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { catchError } from 'rxjs/operators';
import { forkJoin, of, throwError } from 'rxjs';
import { UserserviceService } from '../services/userservice.service';

interface ReportSection {
  title: string;
  headers: string[];
  data: any[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUserEmail: string;
  userList: any[] = [];
  activityList: any[] = [];
  kpiList: any[] = [];
  processList: any[] = [];
  projectList: any[] = [];
  pipList: any[] = [];
  totalProjectsByClient: any[] = [];
  countAnalysesForProject: number = 0;
  projectCountByType: { type: string, count: number }[] = [];

  constructor(
    private userService: UserserviceService,
    private projectService: UserserviceService,
    private pipService: UserserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.getUserIdFromLocalStorage();

    if (userId) {
      this.userService.getEmailById(userId).subscribe(
        (response: any) => {
          this.currentUserEmail = response.email;
        },
        (error: any) => {
          console.error('Error fetching current user email:', error);
        }
      );
    } else {
      console.error('User ID not found in local storage');
    }

    // Using forkJoin to fetch all data in parallel
    forkJoin({
      userList: this.userService.getUserList().pipe(catchError(err => of([]))),
      activityList: this.userService.getActivities().pipe(catchError(err => of([]))),
      kpiList: this.userService.getKpiList().pipe(catchError(err => of([]))),
      processList: this.userService.getProcessusList().pipe(catchError(err => of([]))),
      projectList: this.projectService.getProjectList().pipe(catchError(err => of([]))),
      pipList: this.pipService.getPipList().pipe(catchError(err => of([]))),
   
    }).subscribe({
      next: ({ userList, activityList, kpiList, processList, projectList, pipList }) => {
        this.userList = userList;
        this.activityList = activityList;
        this.kpiList = kpiList;
        this.processList = processList;
        this.projectList = projectList;
        this.pipList = pipList;
   

      
      },
      error: error => {
        console.error('Error fetching data:', error);
        // Handle global data fetching error here
      }
    });
  }

 
  getProjectCountByType(type: string): void {
    this.projectService.getProjectCountByType(type)
      .subscribe(response => {
        const count = this.getCountFromResponse(response, type);
        this.projectCountByType.push({ type, count });
        // Example: Implement logic to handle recursive call or next step dynamically
      });
  }

  getCountFromResponse(response: any, type: string): number {
    // Implement your logic to extract count from the response
    return response.count; // Example, replace with actual logic
  }


  generateFullReport(): void {
    forkJoin({
      userList: this.userService.getUserList().pipe(catchError(err => of([]))),
      activityList: this.userService.getActivities().pipe(catchError(err => of([]))),
      kpiList: this.userService.getKpiList().pipe(catchError(err => of([]))),
      processList: this.userService.getProcessusList().pipe(catchError(err => of([]))),
      projectList: this.projectService.getProjectList().pipe(catchError(err => of([]))),
      pipList: this.pipService.getPipList().pipe(catchError(err => of([]))),
      totalProjectsByClient: this.projectService.getTotalProjetsParClient().pipe(catchError(err => of([]))),
    
    })
    .subscribe({
      next: ({
        userList,
        activityList,
        kpiList,
        processList,
        projectList,
        pipList,
      
      }: {
        userList: any[];
        activityList: any[];
        kpiList: any[];
        processList: any[];
        projectList: any[];
        pipList: any[];
   
      }) => {
        const sections: ReportSection[] = [
          { title: 'Utilisateurs', headers: ['Username', 'Email'], data: userList },
          { title: 'Activités', headers: ['ID', 'name', 'Description'], data: activityList },
          { title: 'KPIs', headers: ['ID', 'name', 'frequence', 'objectif'], data: kpiList },
          { title: 'Processus', headers: ['ID', 'name', 'Description'], data: processList },
          { title: 'Projects', headers: ['ID', 'name', 'type'], data: projectList },
          { title: 'PIPs', headers: ['ID', 'name', 'category', 'type'], data: pipList }
       
        ];

        this.generatePDF(sections);
      },
      error: (error: any) => {
        console.error('Error generating report:', error);
      }
    });
  }

  generatePDF(sections: ReportSection[]): void {
    const doc = new jsPDF();

    doc.setFont('Helvetica');
    doc.setFontSize(12);

    let startY = 10;

    sections.forEach(section => {
      doc.setFontSize(18);
      doc.text(section.title, 15, startY + 10);
      startY += 20;

      this.generateTable(doc, section.headers, section.data, startY);
      startY = startY + 10 + (section.data.length * 10) + 10;

      if (startY > doc.internal.pageSize.height - 20) {
        doc.addPage();
        startY = 10;
      }
    });

    doc.save('rapport.pdf');
  }

  generateTable(doc: jsPDF, headers: string[], data: any[], startY: number): void {
    const columnWidths = this.calculateColumnWidths(headers);
    let startX = 15;
    const rowHeight = 10;
    const cellPadding = 2;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);

    let currentY = startY;
    headers.forEach(header => {
      doc.rect(startX, currentY, columnWidths[header], rowHeight);
      doc.text(header, startX + cellPadding, currentY + rowHeight - cellPadding, { baseline: 'bottom' });
      startX += columnWidths[header];
    });

    startY += rowHeight;

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(10);
    data.forEach(item => {
      startX = 15;
      headers.forEach(header => {
        let cellContent = String(item[header.replace(' ', '').toLowerCase()] || '');
        if (typeof cellContent === 'object') {
          cellContent = this.resolveNestedData(item, header);
        }
        doc.rect(startX, startY, columnWidths[header], rowHeight);
        doc.text(cellContent, startX + cellPadding, startY + rowHeight - cellPadding, { baseline: 'bottom' });
        startX += columnWidths[header];
      });
      startY += rowHeight;
    });
  }

  calculateColumnWidths(headers: string[]): { [key: string]: number } {
    const widths: { [key: string]: number } = {
      Username: 40,
      Email: 80,
      ID: 20,
      name: 60,
      Description: 100,
      frequence: 30,
      objectif: 50,
      Client: 60,
      'Total Projets': 40,
      'Project ID': 20,
      Count: 30,
      Type: 50,
      'Project Count by Type': 50
    };

    headers.forEach(header => {
      if (!widths[header]) {
        widths[header] = 50;
      }
    });

    return widths;
  }

  resolveNestedData(item: any, header: string): string {
    const parts = header.toLowerCase().split('.');
    let value: any = item;
    for (let part of parts) {
      value = value[part];
      if (value === undefined || value === null) {
        return '';
      }
    }
    return String(value);
  }

  getUserIdFromLocalStorage(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
