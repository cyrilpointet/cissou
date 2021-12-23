import { Nanny } from "../models/Nanny";
import { ApiConsumer } from "../services/ApiConsumer";

export const nannyActions = {
    mutations: {
        addNanny(state, nanny) {
            state.baby.nannies.push(new Nanny(nanny));
        },
        removeNanny(state, nannyId) {
            state.baby.nannies = state.baby.nannies.filter(
                (elem) => elem.id !== nannyId
            );
        },
        updateNanny(state, nanny) {
            state.baby.nannies = state.baby.nannies.filter(
                (elem) => elem.id !== nanny.id
            );
            state.baby.nannies.push(new Nanny(nanny));
        },
    },
    actions: {
        async addNanny(context, values) {
            const newNanny = await ApiConsumer.post(
                `baby/${values.babyId}/nanny`,
                {
                    user_id: values.userId,
                }
            );
            context.commit("addNanny", newNanny);
            return;
        },
        async updateNanny(context, values) {
            const newNanny = await ApiConsumer.put(
                `baby/${values.babyId}/nanny/${values.nannyId}`,
                {
                    comment_rights: values.commentsRole,
                }
            );
            context.commit("updateNanny", newNanny);
            return;
        },
        async removeNanny(context, values) {
            await ApiConsumer.delete(
                `baby/${values.babyId}/nanny/${values.nannyId}`
            );
            context.commit("removeNanny", values.nannyId);
        },
    },
};
