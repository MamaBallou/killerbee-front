<template>
    <div class="flex flex-wrap justify-content-center max-h-screen">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6 align-self-center">
            <div class="text-center mb-5">
                <img
                    src="images/blocks/logos/hyper.svg"
                    alt="Image"
                    height="50"
                    class="mb-3"
                />
                <div class="text-900 text-3xl font-medium mb-3">
                    Bienvenue
                </div>
            </div>

            <div>
                <label for="email1" class="block text-900 font-medium mb-2"
                    >Email</label
                >
                <InputText id="email1" type="text" class="w-full mb-3" />

                <label for="password1" class="block text-900 font-medium mb-2"
                    >Mot de passe</label
                >
                <InputText id="password1" type="password" class="w-full mb-3" />

                <Button
                    label="Se connecter"
                    icon="pi pi-user"
                    class="w-full"
                ></Button>
            </div>
        </div>
    </div>
</template>

<style></style>
