import Home from "../pages/HomePage.vue";
import Login from "../pages/LoginPage.vue";

export const Routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: { preloadUser: true },
    },
];
