import { ApiConsumer } from "../services/ApiConsumer";
import { User } from "../models/User";

export const userStore = {
    namespaced: true,

    state: () => ({
        user: null,
        token: null,
    }),
    getters: {
        isLogged: (state) => {
            return state.user !== null && state.token !== null;
        },
    },
    mutations: {
        setUser(state, value) {
            state.user = value;
        },
        setToken(state, value) {
            state.token = value;
        },
    },
    actions: {
        storeUserAndToken(context, value) {
            const user = new User(value.user);
            context.commit("setUser", user);
            context.commit("setToken", value.token);
            ApiConsumer.setToken(value.token);
            localStorage.setItem("token", value.token);
        },

        createUser(context, values) {
            return new Promise((resolve, reject) => {
                ApiConsumer.post("register", values)
                    .then((data) => {
                        context.dispatch("storeUserAndToken", data);
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },

        logUser(context, values) {
            return ApiConsumer.post("login", values).then((data) => {
                context.dispatch("storeUserAndToken", data);
            });
        },

        getUserWithToken(context) {
            return new Promise((resolve, reject) => {
                ApiConsumer.get("profile")
                    .then((data) => {
                        const user = new User(data);
                        context.commit("setUser", user);
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },

        async logout(context) {
            context.commit("setUser", null);
            context.commit("setToken", null);
            await ApiConsumer.post("logout");
            ApiConsumer.removeToken();
            localStorage.removeItem("token");
            return;
        },
    },
};
