import HomePage from "../pages/HomePage.vue";
import LoginPage from "../pages/LoginPage.vue";
import BabyPage from "../pages/BabyPage";

export const Routes = [
    {
        path: "/",
        name: "home",
        component: HomePage,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "login",
        component: LoginPage,
        meta: { preloadUser: true },
    },
    {
        path: "/baby/:id",
        name: "baby",
        component: BabyPage,
        meta: { requiresAuth: true },
    },
];
