import type { Ingredient } from "./Ingredient";


export interface Model {
    id: number;
    nom: string;
    description: string;
    pUHT: number;
    gamme: string;
}