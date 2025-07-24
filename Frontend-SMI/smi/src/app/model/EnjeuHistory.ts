export interface EnjeuHistory {
  id: number;
  enjeuId?: number; // ou enjeu?: Enjeu;
  commentaire: string;
  etatAvant: string;
  etatApres: string;
  dateModification: Date; // ou Date selon ce que tu préfères
  champModifie: string; // exemple: "poids", "description", "cadransSources"
  valeurAvant: string;
  valeurApres: string;
}
