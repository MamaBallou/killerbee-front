import type { Fabrication } from "@/models/Fabrication";
import axios from "axios";
import type { AxiosResponse } from "axios";

export const FabricationService = {
    getAll(): Promise<AxiosResponse> {
        return axios.get("/", {
            params: {
                Table: "Fabrication",
            },
        });
    },
    save(fabrication: Fabrication): Promise<AxiosResponse> {
        return axios.patch("/", {
            params: {
                Table: "Fabrication",
                Data: fabrication,
            },
        });
    },
    create(fabrication: Fabrication): Promise<AxiosResponse> {
        return axios.post("/", {
            params: {
                Table: "Fabrication",
                Data: fabrication,
            },
        });
    },
    delete(fabrication: Fabrication): Promise<AxiosResponse> {
        return axios.delete("/", {
            params: {
                Table: "Fabrication",
                Data: fabrication,
            },
        });
    },
};
