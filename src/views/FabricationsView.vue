<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { FabricationService } from "@/service/FabricationService";
import type { Fabrication } from "@/models/Fabrication";
import type { Model } from "@/models/Model";
import { ModelService } from "@/service/ModelService";
import { IngredientService } from "@/service/IngredientService";
import type { Ingredient } from "@/models/Ingredient";
import type { AxiosResponse } from "axios";

onMounted(() => {
    FabricationService.getAll().then(
        (data: AxiosResponse) => (fabrications.value = data.data)
    );
    ModelService.getAll().then(
        (data: AxiosResponse) => (AllModels.value = data.data)
    );
    IngredientService.getAll().then(
        (data: AxiosResponse) => (AllIngredients.value = data.data)
    );
});

const toast = useToast();
const dt = ref();
const fabrications: Ref<Fabrication[]> = ref(Array<Fabrication>());
const fabricationDialog = ref(false);
const deleteFabricationDialog = ref(false);
const deleteFabricationsDialog = ref(false);
const AllModels = ref(Array<Model>());
const AllIngredients = ref(Array<Ingredient>());

const fabrication: Ref<Fabrication> = ref<Fabrication>({
    Id: 0,
    Nom: "",
    Description: "",
    Id_Modele: 0,
    Etapes_Description: "",
});
const selectedFabrications: Ref<Fabrication[]> = ref(Array<Fabrication>());
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

const openNew = () => {
    fabrication.value = {
        Id: 0,
        Nom: "",
        Description: "",
        Id_Modele: 0,
        Etapes_Description: "",
    };
    submitted.value = false;
    fabricationDialog.value = true;
};
const hideDialog = () => {
    fabricationDialog.value = false;
    submitted.value = false;
};
const saveFabrication = () => {
    submitted.value = true;

    if (fabrication.value.Nom.trim()) {
        if (fabrication.value.Id) {
            FabricationService.save(fabrication.value).then(
                (res: AxiosResponse) => {
                    fabrications.value[findIndexById(fabrication.value.Id)] =
                        fabrication.value;
                    toast.add({
                        severity: "success",
                        summary: "Succès",
                        detail: "Fabrication mise à jour",
                        life: 3000,
                    });
                }
            );
        } else {
            FabricationService.create(fabrication.value).then(  
                (res: AxiosResponse) => {
                    fabrications.value.push(fabrication.value);
                    toast.add({
                        severity: "success",
                        summary: "Succès",
                        detail: "Fabrication créée",
                        life: 3000,
                    });
                }
            );
        }

        fabricationDialog.value = false;
        fabrication.value = {
            Id: 0,
            Nom: "",
            Description: "",
            Id_Modele: 0,
            Etapes_Description: "",
        };
    }
};
const editFabrication = (mod: Fabrication) => {
    fabrication.value = { ...mod };
    fabricationDialog.value = true;
};
const confirmDeleteFabrication = (mod: Fabrication) => {
    fabrication.value = mod;
    deleteFabricationDialog.value = true;
};
const deleteFabrication = () => {
    FabricationService.delete(fabrication.value).then((res: AxiosResponse) => {
        fabrications.value = fabrications.value.filter(
            (val) => val.Id !== fabrication.value.Id
        );
        deleteFabricationDialog.value = false;
        fabrication.value = {
            Id: 0,
            Nom: "",
            Description: "",
            Id_Modele: 0,
            Etapes_Description: "",
        };
        toast.add({
            severity: "success",
            summary: "Succès",
            detail: "Fabrication Supprimée",
            life: 3000,
        });
    });
};
const findIndexById = (id: number) => {
    let index = -1;
    for (let i = 0; i < fabrications.value.length; i++) {
        if (fabrications.value[i].Id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const confirmDeleteSelected = () => {
    deleteFabricationsDialog.value = true;
};
const deleteSelectedFabrications = () => {
    deleteFabricationsDialog.value = false;
    var promises = Promise.resolve();
    for (let i = 0; i < selectedFabrications.value.length; i++) {
        promises = promises.then(() =>
            FabricationService.delete(selectedFabrications.value[i]).then(
                (res: AxiosResponse) => {
                    toast.add({
                        severity: "success",
                        summary: "Succès",
                        detail: "Ingrédient Supprimé",
                        life: 3000,
                    });
                }
            )
        );
    }
    promises.finally(() => {
        fabrications.value = fabrications.value.filter(
            (val) => !selectedFabrications.value.includes(val)
        );
        selectedFabrications.value = Array<Fabrication>();
        toast.add({
            severity: "success",
            summary: "Succès",
            detail: "Fabrications Supprimées",
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
                        :disabled="
                            !selectedFabrications ||
                            !selectedFabrications.length
                        "
                    />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                :value="fabrications"
                v-model:selection="selectedFabrications"
                dataKey="Id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Affiche du {first} au {last} parmi {totalRecords} fabrications"
            >
                <template #header>
                    <div
                        class="flex flex-wrap gap-2 align-items-center justify-content-between"
                    >
                        <h4 class="m-0">Gérer les Fabrications</h4>
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
                    field="Description"
                    header="Description"
                    sortable
                    style="min-width: 10rem"
                ></Column>
                <Column header="Modèle" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        <span>
                            {{
                                AllModels.find(
                                    (model) =>
                                        model.Id === slotProps.data.Id_Modele
                                )?.Nom
                            }}
                        </span>
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 8rem">
                    <template #body="slotProps">
                        <Button
                            icon="pi pi-pencil"
                            outlined
                            rounded
                            class="mr-2"
                            @click="editFabrication(slotProps.data)"
                        />
                        <Button
                            icon="pi pi-trash"
                            outlined
                            rounded
                            severity="danger"
                            @click="confirmDeleteFabrication(slotProps.data)"
                        />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog
            v-model:visible="fabricationDialog"
            :style="{ width: '450px' }"
            header="Détail de Fabrication"
            :modal="true"
            class="p-fluid"
        >
            <div class="field">
                <label for="name">Nom</label>
                <InputText
                    id="name"
                    v-model.trim="fabrication.Nom"
                    required="true"
                    autofocus
                    :class="{ 'p-invalid': submitted && !fabrication.Nom }"
                />
                <small class="p-error" v-if="submitted && !fabrication.Nom"
                    >Le nom est obligatoire.</small
                >
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Textarea
                    id="description"
                    v-model="fabrication.Description"
                    required="false"
                    rows="3"
                    cols="20"
                />
            </div>
            <div class="field">
                <label for="model">Modèle</label>
                <Dropdown
                    id="model"
                    option-label="Nom"
                    option-value="Id"
                    v-model="fabrication.Id_Modele"
                    :options="AllModels"
                />
            </div>
            <div class="field">
                <label for="list_ingredients">Ingrédients</label>
                <ul>
                    <li
                        v-for="ingredient in AllModels.find(
                            (model) => model.Id == fabrication.Id_Modele
                        )?.Ingredient"
                    >
                        {{
                            AllIngredients.find(
                                (ing) => ing.Id == ingredient.Id_Ingredient
                            )?.Nom
                        }}
                        : {{ ingredient.Grammage }} g
                    </li>
                </ul>
            </div>
            <div class="field">
                <label for="etapes_descriptions">Étapes de fabrication</label>
                <Editor
                    id="etapes_descriptions"
                    v-model="fabrication.Etapes_Description"
                    editorStyle="height: 320px"
                />
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
                    @click="saveFabrication"
                />
            </template>
        </Dialog>

        <Dialog
            v-model:visible="deleteFabricationDialog"
            :style="{ width: '450px' }"
            header="Confirm"
            :modal="true"
        >
            <div class="confirmation-content">
                <i
                    class="pi pi-exclamation-triangle mr-3"
                    style="font-size: 2rem"
                />
                <span v-if="fabrication"
                    >Êtes vous sûr de vouloir supprimer
                    <b>{{ fabrication.Nom }}</b> ?</span
                >
            </div>
            <template #footer>
                <Button
                    label="Non"
                    icon="pi pi-times"
                    text
                    @click="deleteFabricationDialog = false"
                />
                <Button
                    label="Oui"
                    icon="pi pi-check"
                    text
                    @click="deleteFabrication"
                />
            </template>
        </Dialog>

        <Dialog
            v-model:visible="deleteFabricationsDialog"
            :style="{ width: '450px' }"
            header="Confirmation"
            :modal="true"
        >
            <div class="confirmation-content">
                <i
                    class="pi pi-exclamation-triangle mr-3"
                    style="font-size: 2rem"
                />
                <span v-if="fabrication"
                    >Êtes vous sûr de vouloir supprimer les fabrications
                    sélectionnées ?</span
                >
            </div>
            <template #footer>
                <Button
                    label="Non"
                    icon="pi pi-times"
                    text
                    @click="deleteFabricationsDialog = false"
                />
                <Button
                    label="Oui"
                    icon="pi pi-check"
                    text
                    @click="deleteSelectedFabrications"
                />
            </template>
        </Dialog>
    </div>
</template>
