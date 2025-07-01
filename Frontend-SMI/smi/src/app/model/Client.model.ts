export interface Client {
  id?: number; // Si l'ID est généré automatiquement côté serveur, il peut être défini comme optionnel
  name: string;
  phone: string; // Modifier le type de données en string
  active: boolean;
  email?: string; // Email du client
  streetAddress?: string; // Adresse de rue
  city?: string; // Ville
  state?: string; // État
  postalCode?: string; // Code postal
  country?: string; // Pays
  notes?: string; // Notes associées au client
  clientType?: string; // Type de client
}

  