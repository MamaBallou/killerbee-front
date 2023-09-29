import type { Model } from "@/models/Model";
import axios from "axios";

export const ModelService = {
    getAll() {
        return axios.get("/", {
            params: {
                Table: "Modèle",
            }
        });
    },

    save(model: Model) {
        return axios.patch("/", {
            params: {
                Table: "Modèle",
                Data: model,
            }
        });
    },

    create(model: Model) {
        return axios.post("/", {
            params: {
                Table: "Modèle",
                Data: model,
            }
        });
    },

    delete(model: Model) {
        return axios.delete("/", {
            params: {
                Table: "Modèle",
                Data: model,
            }
        });
    },
};
