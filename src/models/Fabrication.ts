import type { Model } from "./Model";

export interface Fabrication {
    id: number;
    nom: string;
    description: string;
    id_model: number;
    etapes_descriptions: string;
}