// Pip.model.ts
import { Category } from "./Category.model";

export class Pip {
    id?: number;
    name: string;
    category: Category;
    type: string;
    interaction: string;

    constructor() {
        this.name = '';
        this.category = null;
        this.type = '';
        this.interaction = '';
    }
}
