import { EType } from "./EType.model";
import { Volet } from "./Volet.model";

export interface Cadran {
  id?: number;
  name: string;
  type: EType;
  volet: Partial<Volet>;  // <-- ici Partial permet d'avoir juste l'id sans name et axe

  secteur?: string;
  contexte?: string;
  processus?: string;
  origineInfo?: string;
  creePar?: string;
  dateCreation?: Date;
}
