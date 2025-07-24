import { EnjeuHistory } from "./EnjeuHistory";
import { EPoids } from "./EPoids.model";


export interface Enjeu {
  id?: number;
  cadransSources: number[]; // IDs des cadrans
  attentesPartiesPrenantes: number[]; // IDs des attentes
  description: string;
  poids: EPoids;
  creePar: string;
  dateCreation?: Date;
  dateModification?: Date;
  historiqueModifications?: EnjeuHistory[];
}
