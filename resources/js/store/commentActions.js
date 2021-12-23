import { ApiConsumer } from "../services/ApiConsumer";
import { BabyComment } from "../models/BabyComment";

export const commentActions = {
    mutations: {
        addComment(state, comment) {
            state.baby.comments.push(new BabyComment(comment));
        },
        updateComment(state, comment) {
            state.baby.comments = state.baby.comments.filter(
                (elem) => elem.id !== comment.id
            );
            state.baby.comments.push(new BabyComment(comment));
        },
        removeComment(state, commentId) {
            state.baby.comments = state.baby.comments.filter(
                (elem) => elem.id !== commentId
            );
        },
    },
    actions: {
        async addComment(context, values) {
            const newComment = await ApiConsumer.post(
                `baby/${values.babyId}/comment`,
                {
                    text: values.text,
                }
            );
            context.commit("addComment", newComment);
            return;
        },
        async updateComment(context, values) {
            const newComment = await ApiConsumer.put(
                `baby/${values.babyId}/comment/${values.commentId}`,
                {
                    text: values.text,
                }
            );
            context.commit("updateComment", newComment);
            return;
        },
        async removeComment(context, values) {
            await ApiConsumer.delete(
                `baby/${values.babyId}/comment/${values.commentId}`
            );
            context.commit("removeComment", values.commentId);
            return;
        },
    },
};
