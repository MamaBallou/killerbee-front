import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/LogView.vue"),
        },
        {
            path: "/models",
            name: "models",
            component: () => import("../views/ModelsView.vue"),
        },
        {
            path: "/ingredients",
            name: "ingredients",
            component: () => import("../views/IngredientsView.vue"),
        },
        {
            path: "/fabrications",
            name: "fabrications",
            component: () => import("../views/FabricationsView.vue"),
        },
    ],
});

export default router;
