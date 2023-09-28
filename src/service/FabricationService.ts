import type { Fabrication } from "@/models/Fabrication";

export const FabricationService = {
    getAllFabrications(): Promise<Fabrication[]> {
        return Promise.resolve(this.getAllFabricationsData());
    },

    getAllFabricationsData(): Fabrication[] {
        return [
            {
                id: 1,
                nom: "test",
                description: "test",
                id_model: 1,
                etapes_descriptions: "test",
            },
            {
                id: 2,
                nom: "test2",
                description: "test2",
                id_model: 2,
                etapes_descriptions: "test2",
            },
            {
                id: 3,
                nom: "test3",
                description: "test3",
                id_model: 3,
                etapes_descriptions: "test3",
            },
        ];
    },
};
