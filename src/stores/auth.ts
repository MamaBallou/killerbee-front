import router from "@/router";
import { AuthService } from "@/service/AuthService";
import { ModelService } from "@/service/ModelService";
import { Axios, type AxiosResponse } from "axios";
import { defineStore } from "pinia";

interface State {
    Authenticated: Promise<AxiosResponse>;
    token: string | null;
}

export const useAuthStore = defineStore({
    id: "auth",
    state: (): State => ({
        Authenticated: Promise.resolve({} as AxiosResponse),
        token: null,
    }),
    getters: {
        isAuthenticated: (state: State): Promise<boolean> => {
            return AuthService.verifyToken(localStorage.getItem("token") ?? "")
                .then((response: AxiosResponse) => {
                    if (response.status != 200) {
                        localStorage.removeItem("token");
                        router.push({ name: "login" });
                    }
                    return response.status == 200;
                });
        },
        getToken: (state: State) => {
            return localStorage.getItem("token") ?? null;
        },
    },
    actions: {
        login(payload: { Email: string; Password: string }) {
            return AuthService.login(payload).then(
                (response: AxiosResponse) => {
                    if (response.status == 200) {
                        this.token = response.data.token;
                        localStorage.setItem("token", response.data.token);
                    }
                }
            );
        },
        logout() {
            this.token = null;
            localStorage.removeItem("token");
        },
    },
});
