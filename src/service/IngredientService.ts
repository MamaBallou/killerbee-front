import type { Ingredient } from "../models/Ingredient";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

export const IngredientService = {
    getAll() {
        return axios.get("", {
            params: {
                Endpoint: "/freezebee",
                Table: "Ingrédient",
            },
            headers: {
                Authorization: `Bearer ${authStore.getToken}`,
            },
        });
    },

    save(ingredient: Ingredient) {
        return axios.patch("", 
            {
                Endpoint: "/freezebee",
                Table: "Ingrédient",
                Data: ingredient,
            },
            {
            headers: {
                Authorization: `Bearer ${authStore.getToken}`,
            },}
        );
    },

    create(ingredient: Ingredient) {
        return axios.post("", 
            {
                Endpoint: "/freezebee",
                Table: "Ingrédient",
                Data: ingredient,
            },
            {
            headers: {
                Authorization: `Bearer ${authStore.getToken}`,
            },}
        );
    },

    delete(ingredient: Ingredient) {
        return axios.delete("", {
            headers: {
              Authorization: `Bearer ${authStore.getToken}`
            },
            data: {
                Endpoint: "/freezebee",
                Table: "Ingrédient",
                Id: ingredient.Id,
            }
          });
    },
};
