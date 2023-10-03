import type { Fabrication } from "@/models/Fabrication";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

export const FabricationService = {
    getAll(): Promise<AxiosResponse> {
        return axios.get("/", {
            params: {
                Table: "Fabrication",
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },
    save(fabrication: Fabrication): Promise<AxiosResponse> {
        return axios.patch("/", {
            params: {
                Table: "Fabrication",
                Data: fabrication,
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },
    create(fabrication: Fabrication): Promise<AxiosResponse> {
        return axios.post("/", {
            params: {
                Table: "Fabrication",
                Data: fabrication,
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },
    delete(fabrication: Fabrication): Promise<AxiosResponse> {
        return axios.delete("/", {
            params: {
                Table: "Fabrication",
                Data: fabrication,
            },
            headers: {
                Authorization: authStore.getToken,
            },
        });
    },
};
