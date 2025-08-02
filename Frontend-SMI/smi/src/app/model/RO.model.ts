import { Enjeu } from "./Enjeu.model";

export enum TypeRO {
  RISQUE = 'RISQUE',
  OPPORTUNITE = 'OPPORTUNITE'
}

export interface RO {
  type: TypeRO;
  enjeuId: number;
  enjeu: Enjeu;

  // Champs communs
  id: number;
  probabilite: number;
  acteurResponsable: string;
  dateSuivi: string;

  // RISQUE
  impact?: number;
  evaluationRisque?: number;
  descriptionRisque?: string;
  origine?: string;
  categorie?: string;
  planAction?: string;
  statut?: string;
  severite?: string;

  // OPPORTUNITÉ
  beneficePotentiel?: number;
  valeurOpportunite?: number;
  descriptionOpportunite?: string;
  actionRecommandee?: string;
}
