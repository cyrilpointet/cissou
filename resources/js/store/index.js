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
    getters: {
        isUserParent: (state) => {
            return (
                state.user.user &&
                state.baby.baby &&
                state.user.user.id === state.baby.baby.parent.id
            );
        },
        userRoles: (state) => {
            if (!state.user.user || !state.baby.baby) return null;
            const nanny = state.baby.baby.nannies.find(
                (elem) => elem.id === state.user.user.id
            );
            return nanny.roles;
        },
    },
});
