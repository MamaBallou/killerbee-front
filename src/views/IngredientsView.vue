<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { IngredientService } from "@/service/IngredientService";
import type { Ingredient } from "@/models/Ingredient";
import type { AxiosResponse } from "axios";

onMounted(() => {
    IngredientService.getAll().then(
        (data: AxiosResponse) => (ingredients.value = data.data)
    );
});

const toast = useToast();
const dt = ref();
const ingredients: Ref<Ingredient[]> = ref(Array<Ingredient>());
const ingredientDialog = ref(false);
const deleteIngredientDialog = ref(false);
const deleteIngredientsDialog = ref(false);

const ingredient: Ref<Ingredient> = ref<Ingredient>({
    Id: 0,
    Nom: "",
    Description: "",
});
const selectedIngredients: Ref<Ingredient[]> = ref(Array<Ingredient>());
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);

const openNew = () => {
    ingredient.value = {
        Id: 0,
        Nom: "",
        Description: "",
    };
    submitted.value = false;
    ingredientDialog.value = true;
};
const hideDialog = () => {
    ingredientDialog.value = false;
    submitted.value = false;
};
const saveIngredient = () => {
    submitted.value = true;

    if (ingredient.value.Nom.trim()) {
        if (ingredient.value.Id) {
            IngredientService.save(ingredient.value).then(
                (data: AxiosResponse) => {
                    ingredients.value[findIndexById(ingredient.value.Id)] =
                        ingredient.value;
                    toast.add({
                        severity: "success",
                        summary: "Succès",
                        detail: "Ingrédient mis à jour",
                        life: 3000,
                    });
                }
            );
        } else {
            IngredientService.create(ingredient.value).then(
                (data: AxiosResponse) => {
                    ingredients.value.push(ingredient.value);
                    toast.add({
                        severity: "success",
                        summary: "Succès",
                        detail: "Ingrédient créé",
                        life: 3000,
                    });
                }
            );
        }

        ingredientDialog.value = false;
    }
};
const editIngredient = (mod: Ingredient) => {
    ingredient.value = { ...mod };
    ingredientDialog.value = true;
};
const confirmDeleteIngredient = (mod: Ingredient) => {
    ingredient.value = mod;
    deleteIngredientDialog.value = true;
};
const deleteIngredient = () => {
    IngredientService.delete(ingredient.value).then((data: AxiosResponse) => {
        ingredients.value = ingredients.value.filter(
            (val) => val.Id !== ingredient.value.Id
        );
        deleteIngredientDialog.value = false;
        ingredient.value = {
            Id: 0,
            Nom: "",
            Description: "",
        };
        toast.add({
            severity: "success",
            summary: "Succès",
            detail: "Ingrédient Supprimé",
            life: 3000,
        });
    });
};
const findIndexById = (id: number) => {
    let index = -1;
    for (let i = 0; i < ingredients.value.length; i++) {
        if (ingredients.value[i].Id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const confirmDeleteSelected = () => {
    deleteIngredientsDialog.value = true;
};
const deleteSelectedIngredients = () => {
    deleteIngredientsDialog.value = false;
    var promises: Promise<void> = Promise.resolve();
    for (let i = 0; i < selectedIngredients.value.length; i++) {
        promises = promises.then(() => {
            IngredientService.delete(selectedIngredients.value[i]).then(
                (data: AxiosResponse) => {
                    toast.add({
                        severity: "success",
                        summary: "Succès",
                        detail: "Ingrédient Supprimé",
                        life: 3000,
                    });
                }
            );
        });
    }
    promises.finally(() => {
        ingredients.value = ingredients.value.filter(
            (val) => !selectedIngredients.value.includes(val)
        );
        selectedIngredients.value = Array<Ingredient>();
        toast.add({
            severity: "success",
            summary: "Succès",
            detail: "Ingredients Supprimés",
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
                            !selectedIngredients || !selectedIngredients.length
                        "
                    />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                :value="ingredients"
                v-model:selection="selectedIngredients"
                dataKey="Id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Affiche du {first} au {last} parmi {totalRecords} ingrédients"
            >
                <template #header>
                    <div
                        class="flex flex-wrap gap-2 align-items-center justify-content-between"
                    >
                        <h4 class="m-0">Gérer les Ingrédients</h4>
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
                <Column :exportable="false" style="min-width: 8rem">
                    <template #body="slotProps">
                        <Button
                            icon="pi pi-pencil"
                            outlined
                            rounded
                            class="mr-2"
                            @click="editIngredient(slotProps.data)"
                        />
                        <Button
                            icon="pi pi-trash"
                            outlined
                            rounded
                            severity="danger"
                            @click="confirmDeleteIngredient(slotProps.data)"
                        />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog
            v-model:visible="ingredientDialog"
            :style="{ width: '450px' }"
            header="Détail d'Ingrédient"
            :modal="true"
            class="p-fluid"
        >
            <div class="field">
                <label for="name">Nom</label>
                <InputText
                    id="name"
                    v-model.trim="ingredient.Nom"
                    required="true"
                    autofocus
                    :class="{ 'p-invalid': submitted && !ingredient.Nom }"
                />
                <small class="p-error" v-if="submitted && !ingredient.Nom"
                    >Le nom est obligatoire.</small
                >
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Textarea
                    id="description"
                    v-model="ingredient.Description"
                    required="false"
                    rows="3"
                    cols="20"
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
                    @click="saveIngredient"
                />
            </template>
        </Dialog>

        <Dialog
            v-model:visible="deleteIngredientDialog"
            :style="{ width: '450px' }"
            header="Confirm"
            :modal="true"
        >
            <div class="confirmation-content">
                <i
                    class="pi pi-exclamation-triangle mr-3"
                    style="font-size: 2rem"
                />
                <span v-if="ingredient"
                    >Êtes vous sûr de vouloir supprimer
                    <b>{{ ingredient.Nom }}</b> ?</span
                >
            </div>
            <template #footer>
                <Button
                    label="Non"
                    icon="pi pi-times"
                    text
                    @click="deleteIngredientDialog = false"
                />
                <Button
                    label="Oui"
                    icon="pi pi-check"
                    text
                    @click="deleteIngredient"
                />
            </template>
        </Dialog>

        <Dialog
            v-model:visible="deleteIngredientsDialog"
            :style="{ width: '450px' }"
            header="Confirmation"
            :modal="true"
        >
            <div class="confirmation-content">
                <i
                    class="pi pi-exclamation-triangle mr-3"
                    style="font-size: 2rem"
                />
                <span v-if="ingredient"
                    >Êtes vous sûr de vouloir supprimer les ingrédients
                    sélectionnés ?</span
                >
            </div>
            <template #footer>
                <Button
                    label="Non"
                    icon="pi pi-times"
                    text
                    @click="deleteIngredientsDialog = false"
                />
                <Button
                    label="Oui"
                    icon="pi pi-check"
                    text
                    @click="deleteSelectedIngredients"
                />
            </template>
        </Dialog>
    </div>
</template>
