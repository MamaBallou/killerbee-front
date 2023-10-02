import type { Ingredient } from "../models/Ingredient";
import axios from "axios";

export const IngredientService = {
    getAll() {
        return axios.get("/", {
            params: {
                Table: "Ingrédient",
            },
        });
    },

    save(ingredient: Ingredient) {
        return axios.patch("/", {
            params: {
                Table: "Ingrédient",
                Data: ingredient,
            },
        });
    },

    create(ingredient: Ingredient) {
        return axios.post("/", {
            params: {
                Table: "Ingrédient",
                Data: ingredient,
            },
        });
    },

    delete(ingredient: Ingredient) {
        return axios.delete("/", {
            params: {
                Table: "Ingrédient",
                Data: ingredient,
            },
        });
    },
};
