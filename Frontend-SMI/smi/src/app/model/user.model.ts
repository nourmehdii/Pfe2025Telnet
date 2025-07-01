// export class User {
//   constructor(
//     public id?: number,
//     public firstName?: string,
//     public lastName?: string,
//     public username?: string,
//     public email?: string,
//     public password?: string,
//     public role?: string
//   ) {}

import { Role } from "./Role.model";
import { Activity } from "./activities.mosel";

// }
export interface User {
  id:number,
  firstName: string;
  lastName: string;
  email: string;
  username?:string;
  password: string;
  role: Role;
  activities: Activity[]; 
  // Nouvelle propriété pour stocker le rôle sélectionné
  // Autres propriétés d'utilisateur...
}
