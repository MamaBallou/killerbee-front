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
                ingredients: [
                    {
                        id: 1,
                        grammage: 10,
                    },
                    {
                        id: 2,
                        grammage: 20,
                    },
                    {
                        id: 3,
                        grammage: 30,
                    },
                ],
            },
            {
                id: 2,
                nom: "test2",
                description: "test2",
                pUHT: 10.56,
                gamme: "Milieu",
                ingredients: [
                    {
                        id: 1,
                        grammage: 10,
                    },
                    {
                        id: 2,
                        grammage: 20,
                    },
                    {
                        id: 3,
                        grammage: 30,
                    },
                ],
            },
            {
                id: 3,
                nom: "test3",
                description: "test3",
                pUHT: 5.99,
                gamme: "Basse",
                ingredients: [
                    {
                        id: 1,
                        grammage: 10,
                    },
                    {
                        id: 2,
                        grammage: 20,
                    },
                    {
                        id: 3,
                        grammage: 30,
                    },
                ],
            },
        ];
    },
};
