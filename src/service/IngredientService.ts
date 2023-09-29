import type { Ingredient } from "../models/Ingredient";
import axios from "axios";

export const IngredientService = {
    getAll() {
        return axios.get("http://localhost:3000/", {
            params: {
                Table: "Ingrédient",
            },
        });
    },

    save(ingredient: Ingredient) {
        return axios.patch("http://localhost:3000/", {
            params: {
                Table: "Ingrédient",
                Data: ingredient,
            },
        });
    },

    create(ingredient: Ingredient) {
        return axios.post("http://localhost:3000/", {
            params: {
                Table: "Ingrédient",
                Data: ingredient,
            },
        });
    },

    delete(ingredient: Ingredient) {
        return axios.delete("http://localhost:3000/", {
            params: {
                Table: "Ingrédient",
                Data: ingredient,
            },
        });
    },
};
