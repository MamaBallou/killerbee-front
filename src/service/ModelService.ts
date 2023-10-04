import type { Model } from "@/models/Model";
import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

export const ModelService = {
    getAll() {
        return axios.get("", {
            params: {
                Endpoint: "/freezebee",
                Table: "Modèle",
            },
            headers: {
                Authorization: `Bearer ${authStore.getToken}`,
            },
        });
    },

    save(model: Model) {
        return axios.patch("", 
            {
                Endpoint: "/freezebee",
                Table: "Modèle",
                Data: model,
            },
            {
            headers: {
                Authorization: `Bearer ${authStore.getToken}`,
            },}
        );
    },

    create(model: Model) {
        return axios.post("", 
            {
                Endpoint: "/freezebee",
                Table: "Modèle",
                Data: model,
            },
            {
            headers: {
                Authorization: `Bearer ${authStore.getToken}`,
            },}
        );
    },

    delete(model: Model) {
        return axios.delete("", {
            headers: {
              Authorization: `Bearer ${authStore.getToken}`
            },
            data: {
                Endpoint: "/freezebee",
                Table: "Modèle",
                Id: model.Id,
                Id_Modele: model.Id,
            }
          });
    },
};
