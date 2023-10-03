<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
const Email = ref("");
const Password = ref("");

const authStore = useAuthStore();

const login = () => {
    if (!Email.value || !Password.value) return;

    authStore
        .login({ Email: Email.value, Password: Password.value })
        .finally(() => {
            authStore.isAuthenticated.finally(() => {
                router.push("/fabrications");
            });
        });
};
</script>

<template>
    <div class="flex flex-wrap justify-content-center max-h-screen">
        <div
            class="surface-card p-4 shadow-2 border-round w-full lg:w-6 align-self-center"
        >
            <div class="text-center mb-5">
                <img
                    src="/src/assets/KillerBee_logo.png"
                    alt="Image"
                    height="50"
                    class="mb-3"
                />
                <div class="text-900 text-3xl font-medium mb-3">Bienvenue</div>
            </div>

            <div>
                <label for="email1" class="block text-900 font-medium mb-2"
                    >Email</label
                >
                <InputText
                    id="email1"
                    type="text"
                    class="w-full mb-3"
                    v-model="Email"
                    @keydown.enter.enter="login"
                />

                <label for="password1" class="block text-900 font-medium mb-2"
                    >Mot de passe</label
                >
                <InputText
                    id="password1"
                    type="password"
                    class="w-full mb-3"
                    v-model="Password"
                    @keydown.enter.enter="login"
                />

                <Button
                    label="Se connecter"
                    icon="pi pi-user"
                    class="w-full"
                    @click="login"
                    @keydown.enter.enter="login"
                    @keydown.enter.space="login"
                ></Button>
            </div>
        </div>
    </div>
</template>
