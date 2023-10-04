import type { Fabrication } from "@/models/Fabrication";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

export const FabricationService = {
    getAll(): Promise<AxiosResponse> {
        return axios.get("", {
            params: {
                Endpoint: "/freezebee",
                Table: "Fabrication",
            },
            headers: {
                Authorization: `Bearer ${authStore.getToken}`,
            },
        });
    },
    save(fabrication: Fabrication): Promise<AxiosResponse> {
        return axios.patch("", 
            {
                Endpoint: "/freezebee",
                Table: "Fabrication",
                Data: fabrication,
            },
            {
            headers: {
                Authorization: `Bearer ${authStore.getToken}`,
            },}
        );
    },
    create(fabrication: Fabrication): Promise<AxiosResponse> {
        return axios.post("", 
            {
                Endpoint: "/freezebee",
                Table: "Fabrication",
                Data: fabrication,
            },
            {
            headers: {
                Authorization: `Bearer ${authStore.getToken}`,
            },}
        );
    },
    delete(fabrication: Fabrication): Promise<AxiosResponse> {
        return axios.delete("", {
            headers: {
              Authorization: `Bearer ${authStore.getToken}`
            },
            data: {
                Endpoint: "/freezebee",
                Table: "Fabrication",
                Id: fabrication.Id,
            }
          });
    },
};
