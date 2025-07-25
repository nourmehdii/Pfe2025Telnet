import { EType } from "./EType.model";
import { Volet } from "./Volet.model";

export interface Cadran {
  id?: number;
  name: string;
  type: EType;
  volet?: Volet;  // 👈 ici on utilise tout l'objet complet Volet
  secteur: string;
  contexte: string;
  processus: string;
  origineInfo: string;
  creePar: string;
  dateCreation?: Date;
}
