import { Interaction } from './Interaction.model';

export interface Category {
  id?: number; // Optionnel, généré par le backend
  name: string;
  interaction: Interaction; // Ajout de l'attribut interaction
}
  