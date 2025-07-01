import { Processus } from "./Processus.model";

export interface Activity {
  id?: number;
  name: string;
  description: string;
  processus?: Processus[]; // Modifiez [] en any[] pour spécifier que processus est un tableau de types inconnus.
}
