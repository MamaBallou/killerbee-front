<script setup lang="ts">
import type { Ingredient } from "@/models/Ingredient";
import type { IngredientInModel } from "@/models/IngredientInModel";
import { IngredientService } from "@/service/IngredientService";
import type DataTable from "primevue/datatable";
import { ref, onMounted, type Ref } from "vue";
import { useToast } from "primevue/usetoast";
import type { AxiosResponse } from "axios";

const props = defineProps<{
    ingredients: IngredientInModel[];
}>();

const listAllIngredients = ref<Ingredient[]>([]);
const ingredient = ref<IngredientInModel>({
    Id_Ingredient: 0,
    Grammage: 0,
});
const deleteIngredientDialog = ref(false);
const editingRows = ref([]);
const toast = useToast();

onMounted(() => {
    IngredientService.getAll().then((res: AxiosResponse) => {
        listAllIngredients.value = res.data;
    });
});

const addRow = () => {
    const dt = ref<DataTable | null>(null);
    const newIngredient: IngredientInModel = {
        Id_Ingredient: 0,
        Grammage: 0,
    };
    props.ingredients.push(newIngredient);
};

const confirmDeleteModel = (ing: IngredientInModel) => {
    ingredient.value = ing;
    deleteIngredientDialog.value = true;
};
const deleteIngredient = () => {
    props.ingredients.splice(props.ingredients.indexOf(ingredient.value), 1);
    deleteIngredientDialog.value = false;
    ingredient.value = {
        Id_Ingredient: -1,
        Grammage: 0,
    };
    toast.add({
        severity: "success",
        summary: "Succès",
        detail: "Ingrédient Supprimé",
        life: 3000,
    });
};

const onRowEditSave = (event: any) => {
    // TODO: Trouver le type
    let { newData, index } = event;

    props.ingredients[index] = newData;
};
</script>

<template>
    <DataTable
        v-model:editingRows="editingRows"
        editMode="row"
        @row-edit-save="onRowEditSave"
        tableClass="editable-cells-table"
        ref="dt"
        :value="ingredients"
        data-key="Id_Ingredient"
        :rows="300"
    >
        <template #header>
            <div
                class="flex flex-wrap gap-2 align-items-center justify-content-between"
            >
                <h4 class="m-0">Ingredients et Grammage</h4>
                <Button
                    label="Ajouter"
                    icon="pi pi-plus"
                    severity="success"
                    @click="addRow"
                />
            </div>
        </template>
        <Column header="Ingrédient">
            <template #body="dat">
                <span>{{
                    listAllIngredients.find(
                        (element) => element.Id == dat.data.Id_Ingredient
                    )?.Nom
                }}</span>
            </template>
            <template #editor="{ data, field }">
                <Dropdown
                    v-model="data.Id_Ingredient"
                    :options="listAllIngredients"
                    option-value="Id"
                    optionLabel="Nom"
                    placeholder="Sélectionner un ingrédient"
                />
            </template>
        </Column>
        <Column field="Grammage" header="Grammage">
            <template #editor="{ data, field }">
                <InputNumber
                    v-model="data[field]"
                    suffix="g"
                    :minFractionDigits="2"
                    :maxFractionDigits="2"
                />
            </template>
        </Column>
        <Column
            :rowEditor="true"
            style="width: 10%; min-width: 8rem"
            bodyStyle="text-align:center"
        ></Column>
        <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
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
                <b>{{
                    listAllIngredients.find(
                        (element) => (element.Id = ingredient.Id_Ingredient)
                    )?.Nom
                }}</b>
                ?</span
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
</template>
