import { Kpi } from "./Kpi.model";
import { Project } from "./Project.model";

export interface KpiHistory {
    id: number;
    kpi: Kpi;
    project: Project;
    kpi_name: string;
    kpi_objectif: number;
    value: number;
    startDateP: Date;
    endDateP: Date;
    historyId: number;
  }