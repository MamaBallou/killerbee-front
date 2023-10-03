import axios from "axios";

type auth = {
    Email: string;
    Password: string;
};

export const AuthService = {
    login(payload: auth) {
        return axios.post("/", payload);
    },
    verifyToken(token: string) {
        return axios.get("/", {
            headers: {
                Authorization: token,
            },
            params: {
                Table: "Modèle",
            },
        });
    },
};
