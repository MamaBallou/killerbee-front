import type { Ingredient } from "../models/Ingredient";

export const IngredientService = {
    getAll() {
        return Promise.resolve(this.getIngredientsData());
    },

    getIngredientsData(): Ingredient[] {
        return [
            {
                id: 1,
                nom: "test",
                description: "test",
            },
            {
                id: 2,
                nom: "test2",
                description: "test2",
            },
            {
                id: 3,
                nom: "test3",
                description: "test3",
            },
            {
                id: 4,
                nom: "test4",
                description: "test4",
            },
        ];
    },
};
