import type { IngredientInModel } from "./IngredientInModel";


export interface Model {
    id: number;
    nom: string;
    description: string;
    pUHT: number;
    gamme: string;
    ingredients: IngredientInModel[];
}