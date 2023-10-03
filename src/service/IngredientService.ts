import type { Ingredient } from "../models/Ingredient";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

export const IngredientService = {
    getAll() {
        return axios.get("/", {
            params: {
                Table: "Ingrédient",
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },

    save(ingredient: Ingredient) {
        return axios.patch("/", {
            params: {
                Table: "Ingrédient",
                Data: ingredient,
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },

    create(ingredient: Ingredient) {
        return axios.post("/", {
            params: {
                Table: "Ingrédient",
                Data: ingredient,
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },

    delete(ingredient: Ingredient) {
        return axios.delete("/", {
            params: {
                Table: "Ingrédient",
                Data: ingredient,
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },
};
