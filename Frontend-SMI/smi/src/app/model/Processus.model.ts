import { Kpi } from "./Kpi.model";
import { Activity } from "./activities.mosel";

export interface Processus {
    id: number;
    name: string;
    description: string;
    activities?: Activity[];
    kpis?: Kpi[]; 
  }
  