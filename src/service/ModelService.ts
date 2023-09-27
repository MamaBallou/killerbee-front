import type { Model } from "@/models/Model";

export const ModelService = {
    getModels(): Promise<Model[]> {
        return Promise.resolve(this.getModelsData());
    },

    getModelsData(): Model[] {
        return [
            {
                id: 1,
                nom: "test",
                description: "test",
                pUHT: 20.01,
                gamme: "Haute",
            },
            {
                id: 2,
                nom: "test2",
                description: "test2",
                pUHT: 10.56,
                gamme: "Milieu"
            },
            {
                id: 3,
                nom: "test3",
                description: "test3",
                pUHT: 5.99,
                gamme: "Basse"
            },
        ];
    },
};
