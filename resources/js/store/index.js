import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "./userStore";
import { babyStore } from "./babyStore";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user: userStore,
        baby: babyStore,
    },
});
