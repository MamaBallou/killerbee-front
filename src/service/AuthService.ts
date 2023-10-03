import axios from "axios";

type auth = {
    Email: string;
    Password: string;
};

export const AuthService = {
    login(payload: auth) {
        return axios.post("/", {
            Endpoint: "/connexion",
            Email: payload.Email,
            Password: payload.Password,
        });
    },
    verifyToken(token: string) {
        return axios.get("/", {
            headers: {
                Authorization: token,
            },
            params: {
                Endpoint: "/connexion",
                Table: "Modèle",
            },
        });
    },
};
