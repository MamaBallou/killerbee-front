import type { IngredientInModel } from "./IngredientInModel";

export interface Model {
    Id: number;
    Nom: string;
    Description: string;
    pUHT: number;
    Gamme: string;
    Ingredient: IngredientInModel[];
}
