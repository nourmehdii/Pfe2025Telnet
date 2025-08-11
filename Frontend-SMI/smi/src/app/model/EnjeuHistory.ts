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

// export interface EnjeuState {
//   id?: number | null;
//   description?: string;
//   poids?: string;
//   cadransSources?: number[];
//   attentesPartiesPrenantes?: number[];
//   creePar?: string;
//   dateCreation?: string | null;
//   dateModification?: string | null;
//   commentaireDerniereModification?: string | null;
// }
// export interface EnjeuHistory {
//   id: number;
//   enjeuId: number;
//   commentaire: string;
//   etatAvant: { [key: string]: any }; // Use 'any' or a more specific type if known
//   etatApres: { [key: string]: any }; // Use 'any' or a more specific type if known
//   dateModification: Date;
//   valeurAvant?: string; // Optional, based on your simulation
//   valeurApres?: string; // Optional, based on your simulation
//   champModifie?: string; // Optional, based on your simulation
// }