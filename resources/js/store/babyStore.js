import { ApiConsumer } from "../services/ApiConsumer";
import { Baby } from "../models/Baby";

export const babyStore = {
    namespaced: true,

    state: () => ({
        baby: null,
    }),
    mutations: {
        setBaby(state, value) {
            state.baby = value;
        },
    },
    actions: {
        async getBaby(context, id) {
            const baby = await ApiConsumer.get(`baby/${id}`);
            context.commit("setBaby", new Baby(baby));
            return;
        },
    },
};
