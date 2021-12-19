import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

new Vue({
    router,
    store,
    created() {
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            if (window.matchMedia("(orientation: portrait)").matches) {
                this.$store.commit("setDeferredPrompt", e);
            }
        });
    },
    render: (h) => h(App),
}).$mount("#app");
