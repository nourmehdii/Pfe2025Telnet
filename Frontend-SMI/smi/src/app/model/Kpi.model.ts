import { KpiHistory } from "./KpiHistory.model";
import { Processus } from "./Processus.model";

export interface Kpi {
  id: number;
  name: string;
  processusList: Processus[];
  objectif: number;
  frequence: string; // Assurez-vous que le type FrequenceKPI est correctement défini dans Angular
  historyList: KpiHistory[];
  value: number;

}
