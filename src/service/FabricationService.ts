import type { Fabrication } from "@/models/Fabrication";
import axios from "axios";
import type { AxiosResponse } from "axios";

export const FabricationService = {
    getAll(): Promise<AxiosResponse> {
        return axios.get("/", {
            params: {
                Table: "Fabrication",
            }
        })
    },
};
