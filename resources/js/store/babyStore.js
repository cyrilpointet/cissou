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
        async createBaby(context, values) {
            const baby = await ApiConsumer.post("baby", values);
            context.commit("setBaby", new Baby(baby));
            context.commit("user/addBaby", baby, { root: true });
            return baby;
        },
        async updateBaby(context, values) {
            const baby = await ApiConsumer.put(`baby/${values.id}`, values);
            context.commit("setBaby", new Baby(baby));
            context.commit("user/updateBaby", baby, { root: true });
            return baby;
        },
        async deleteBaby(context, id) {
            await ApiConsumer.delete(`baby/${id}`);
            context.commit("setBaby", null);
            context.commit("user/removeBaby", id, { root: true });
            return;
        },
    },
};
