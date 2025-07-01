// Project.model.ts

import { Client } from "./Client.model";
import { Kpi } from "./Kpi.model";
import { Processus } from "./Processus.model";
import { Activity } from "./activities.mosel";


export class Project {
  id?: number;
  name: string;
  type: string;
  startDate: Date;
  endDate: Date;
  processus: Processus[];
  kpis?: Kpi[];
  activities?: Activity[]; 
  cli: Client;
  activity?: { id: number }; // Utiliser la structure attendue par le serveur pour l'activité
  projectDate?: {
    startDate: Date;
    endDate: Date;
  };

  constructor(name: string, type: string, startDate: Date, endDate: Date, processus: Processus[], cli: Client, activityId: number, activities: Activity[]) {
    this.name = name;
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
    this.processus = processus;
    this.cli = cli;
    this.activity = { id: activityId }; // Initialiser la propriété activity avec la structure attendue
    this.projectDate = {
      startDate: startDate,
      endDate: endDate
    };
    this.activities = activities; // Initialiser la propriété activities avec les activités fournies
  }
}
