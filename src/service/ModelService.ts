import type { Model } from "@/models/Model";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

export const ModelService = {
    getAll() {
        return axios.get("/", {
            params: {
                Endpoint: "/freezebee",
                Table: "Modèle",
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },

    save(model: Model) {
        return axios.patch("/", {
            params: {
                Endpoint: "/freezebee",
                Table: "Modèle",
                Data: model,
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },

    create(model: Model) {
        return axios.post("/", {
            params: {
                Endpoint: "/freezebee",
                Table: "Modèle",
                Data: model,
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },

    delete(model: Model) {
        return axios.delete("/", {
            params: {
                Endpoint: "/freezebee",
                Table: "Modèle",
                Data: model,
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },
};
