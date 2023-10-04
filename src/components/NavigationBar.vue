<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref, onMounted, watch, onUpdated } from "vue";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const isAuthenticated = ref(false);

const router = useRouter();
const route = useRoute();

const active = ref(0);
const items = ref([
    {
        label: "Fabrications",
        icon: "pi pi-spin pi-cog",
        route: "/fabrications",
    },
    {
        label: "Modèles",
        icon: "pi pi-fw pi-pencil",
        route: "/models",
    },
    {
        label: "Ingrédients",
        icon: "pi pi-list",
        route: "/ingredients",
    },
]);
const authenticated = ref(false);

onMounted(() => {
    active.value = items.value.findIndex(
        (item) => route.path === router.resolve(item.route).path
    );
    authStore.isAuthenticated.then((response: boolean) => {
        isAuthenticated.value = response;
    });
});

watch(
    route,
    () => {
        active.value = items.value.findIndex(
            (item) => route.path === router.resolve(item.route).path
        );
    },
    { immediate: true }
);

const logout = () => {
    authStore.logout();
    isAuthenticated.value = false;
    router.push({ name: "login" });
};
</script>

<template>
    <div v-if="isAuthenticated">
        <Button
            label="Déconnecter"
            icon="pi pi-power-off"
            class="p-button-secondary"
            @click="logout"
        />
        <TabMenu v-model:activeIndex="active" :model="items">
            <template #item="{ label, item, props }">
                <router-link
                    v-if="item.route"
                    v-slot="routerProps"
                    :to="item.route"
                    custom
                >
                    <a
                        :href="routerProps.href"
                        v-bind="props.action"
                        @click="($event) => routerProps.navigate($event)"
                        @keydown.enter.space="
                            ($event:any) => routerProps.navigate($event)
                        "
                    >
                        <span v-bind="props.icon" />
                        <span v-bind="props.label">{{ label }}</span>
                    </a>
                </router-link>
            </template>
        </TabMenu>
    </div>
    <RouterView />
</template>
