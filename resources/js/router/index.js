import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store/index";
import { ApiConsumer } from "../services/ApiConsumer";
import { Routes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: Routes,
    scrollBehavior() {
        return { behavior: "smooth", x: 0, y: 0 };
    },
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const token = localStorage.getItem("token");
        if (!token) {
            next({
                path: "/login",
                query: { redirect: to.fullPath },
            });
            return;
        }
        ApiConsumer.setToken(token);
        Store.commit("user/setToken", token);
        if (Store.getters["user/isLogged"]) {
            next();
            return;
        }
        try {
            await Store.dispatch("user/getUserWithToken");
            next();
            return;
        } catch {
            Store.dispatch("user/logout");
            next({
                path: "/login",
                query: { redirect: to.fullPath },
            });
            return;
        }
    }
    // Preload user for account page - usefull if landing on /account
    if (to.matched.some((record) => record.meta.preloadUser)) {
        const token = localStorage.getItem("token");
        if (!token) {
            next();
            return;
        }
        ApiConsumer.setToken(token);
        Store.commit("user/setToken", token);
        if (Store.getters["user/isLogged"]) {
            next();
            return;
        }
        try {
            await Store.dispatch("user/getUserWithToken");
            next();
            return;
        } catch {
            Store.dispatch("user/logout");
            next();
            return;
        }
    }
    next();
});

export default router;
