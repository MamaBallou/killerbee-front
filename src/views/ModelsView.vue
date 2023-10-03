<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { ModelService } from "@/service/ModelService";
import type { Model } from "@/models/Model";
import ChooseIngredient from "@/components/ChooseIngredient.vue";
import type { AxiosResponse } from "axios";

onMounted(() => {
    ModelService.getAll().then(
        (data: AxiosResponse) => (models.value = data.data)
    );
});

const toast = useToast();
const dt = ref();
const models: Ref<Model[]> = ref(Array<Model>());
const modelDialog = ref(false);
const deleteModelDialog = ref(false);
const deleteModelsDialog = ref(false);

const model: Ref<Model> = ref<Model>({
    Id: 0,
    Nom: "",
    Description: "",
    pUHT: 0,
    Gamme: "",
    Ingredient: [],
});
const selectedModels: Ref<Model[]> = ref(Array<Model>());
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

const formatCurrency = (value: number) => {
    if (value)
        return value.toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR",
        });
    return;
};
const openNew = () => {
    model.value = {
        Id: 0,
        Nom: "",
        Description: "",
        pUHT: 0,
        Gamme: "",
        Ingredient: [],
    };
    submitted.value = false;
    modelDialog.value = true;
};
const hideDialog = () => {
    modelDialog.value = false;
    submitted.value = false;
};
const saveModel = () => {
    submitted.value = true;

    if (model.value.Nom.trim()) {
        if (model.value.Id) {
            ModelService.save(model.value).then((data: AxiosResponse) => {
                models.value[findIndexById(model.value.Id)] = model.value;
                toast.add({
                    severity: "success",
                    summary: "Succès",
                    detail: "Modèle mis à jour",
                    life: 3000,
                });
            });
        } else {
            ModelService.create(model.value).then((data: AxiosResponse) => {
                models.value.push(model.value);
                toast.add({
                    severity: "success",
                    summary: "Succès",
                    detail: "Modèle créé",
                    life: 3000,
                });
            });
        }

        modelDialog.value = false;
    }
};
const editModel = (mod: Model) => {
    model.value = { ...mod };
    modelDialog.value = true;
};
const confirmDeleteModel = (mod: Model) => {
    model.value = mod;
    deleteModelDialog.value = true;
};
const deleteModel = () => {
    ModelService.delete(model.value).then((data: AxiosResponse) => {
        models.value = models.value.filter((val) => val.Id !== model.value.Id);
        deleteModelDialog.value = false;
        model.value = {
            Id: 0,
            Nom: "",
            Description: "",
            pUHT: 0,
            Gamme: "",
            Ingredient: [],
        };
        toast.add({
            severity: "success",
            summary: "Succès",
            detail: "Modèle Supprimé",
            life: 3000,
        });
    });
};
const findIndexById = (id: number) => {
    let index = -1;
    for (let i = 0; i < models.value.length; i++) {
        if (models.value[i].Id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const confirmDeleteSelected = () => {
    deleteModelsDialog.value = true;
};
const deleteSelectedModels = () => {
    deleteModelsDialog.value = false;
    var promises: Promise<void> = Promise.resolve();
    for (let i = 0; i < selectedModels.value.length; i++) {
        promises.then(() => {
            ModelService.delete(selectedModels.value[i]);
        });
    }
    promises = promises.finally(() => {
        models.value = models.value.filter(
            (val) => !selectedModels.value.includes(val)
        );
        selectedModels.value = Array<Model>();
        toast.add({
            severity: "success",
            summary: "Succès",
            detail: "Modèles Supprimés",
            life: 3000,
        });
    });
};
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button
                        label="Créer"
                        icon="pi pi-plus"
                        severity="success"
                        class="mr-2"
                        @click="openNew"
                    />
                    <Button
                        label="Supprimer"
                        icon="pi pi-trash"
                        severity="danger"
                        @click="confirmDeleteSelected"
                        :disabled="!selectedModels || !selectedModels.length"
                    />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                :value="models"
                v-model:selection="selectedModels"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Affiche du {first} au {last} parmi {totalRecords} modèles."
            >
                <template #header>
                    <div
                        class="flex flex-wrap gap-2 align-items-center justify-content-between"
                    >
                        <h4 class="m-0">Gérer les Modèles</h4>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText
                                v-model="filters['global'].value"
                                placeholder="Chercher..."
                            />
                        </span>
                    </div>
                </template>

                <Column
                    selectionMode="multiple"
                    style="width: 3rem"
                    :exportable="false"
                ></Column>
                <Column
                    field="Nom"
                    header="Nom"
                    sortable
                    style="min-width: 16rem"
                ></Column>
                <Column
                    field="pUHT"
                    header="Prix Hors Taxes"
                    sortable
                    style="min-width: 8rem"
                >
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.pUHT) }}
                    </template>
                </Column>
                <Column
                    field="Description"
                    header="Description"
                    sortable
                    style="min-width: 10rem"
                ></Column>
                <Column
                    field="Gamme"
                    header="Gamme"
                    sortable
                    style="min-width: 10rem"
                ></Column>
                <Column :exportable="false" style="min-width: 8rem">
                    <template #body="slotProps">
                        <Button
                            icon="pi pi-pencil"
                            outlined
                            rounded
                            class="mr-2"
                            @click="editModel(slotProps.data)"
                        />
                        <Button
                            icon="pi pi-trash"
                            outlined
                            rounded
                            severity="danger"
                            @click="confirmDeleteModel(slotProps.data)"
                        />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog
            v-model:visible="modelDialog"
            :style="{ width: '450px' }"
            header="Détail de Modèle"
            :modal="true"
            class="p-fluid"
        >
            <div class="field">
                <label for="name">Nom</label>
                <InputText
                    id="name"
                    v-model.trim="model.Nom"
                    required="true"
                    autofocus
                    :class="{ 'p-invalid': submitted && !model.Nom }"
                />
                <small class="p-error" v-if="submitted && !model.Nom"
                    >Le nom est obligatoire.</small
                >
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Textarea
                    id="description"
                    v-model="model.Description"
                    required="false"
                    rows="3"
                    cols="20"
                />
            </div>
            <div class="field">
                <label for="price">Price</label>
                <InputNumber
                    id="price"
                    v-model="model.pUHT"
                    mode="currency"
                    currency="EUR"
                    locale="fr-FR"
                />
            </div>
            <div class="field">
                <label for="gamme">Gamme</label>
                <InputText id="gamme" v-model="model.Gamme" required="false" />
            </div>
            <div class="field">
                <label for="ingredients">Ingrédients</label>
                <ChooseIngredient :ingredients="model.Ingredient" />
            </div>
            <template #footer>
                <Button
                    label="Annuler"
                    icon="pi pi-times"
                    text
                    @click="hideDialog"
                />
                <Button
                    label="Sauvegarder"
                    icon="pi pi-check"
                    text
                    @click="saveModel"
                />
            </template>
        </Dialog>

        <Dialog
            v-model:visible="deleteModelDialog"
            :style="{ width: '450px' }"
            header="Confirm"
            :modal="true"
        >
            <div class="confirmation-content">
                <i
                    class="pi pi-exclamation-triangle mr-3"
                    style="font-size: 2rem"
                />
                <span v-if="model"
                    >Êtes vous sûr de vouloir supprimer
                    <b>{{ model.Nom }}</b> ?</span
                >
            </div>
            <template #footer>
                <Button
                    label="Non"
                    icon="pi pi-times"
                    text
                    @click="deleteModelDialog = false"
                />
                <Button
                    label="Oui"
                    icon="pi pi-check"
                    text
                    @click="deleteModel"
                />
            </template>
        </Dialog>

        <Dialog
            v-model:visible="deleteModelsDialog"
            :style="{ width: '450px' }"
            header="Confirmation"
            :modal="true"
        >
            <div class="confirmation-content">
                <i
                    class="pi pi-exclamation-triangle mr-3"
                    style="font-size: 2rem"
                />
                <span v-if="model"
                    >Êtes vous sûr de vouloir supprimer les modèles sélectionnés
                    ?</span
                >
            </div>
            <template #footer>
                <Button
                    label="Non"
                    icon="pi pi-times"
                    text
                    @click="deleteModelsDialog = false"
                />
                <Button
                    label="Oui"
                    icon="pi pi-check"
                    text
                    @click="deleteSelectedModels"
                />
            </template>
        </Dialog>
    </div>
</template>
