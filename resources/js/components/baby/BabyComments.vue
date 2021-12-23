<template>
    <div>
        <h4>Comments</h4>
        <div v-for="comment in baby.comments" :key="comment.id">
            <p>
                {{ comment.text }}
            </p>
            <CommentUpdater
                v-if="isUserParent || userRoles.comments.write"
                :comment="comment"
            />
            <button
                v-if="isUserParent || userRoles.comments.write"
                @click="deleteComment(comment.id)"
            >
                Delete
            </button>
        </div>

        <div v-if="baby.comments.length < 1">
            <p>Pas de commentaire</p>
        </div>

        <CommentCreator v-if="isUserParent || userRoles.comments.write" />
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CommentCreator from "../comment/CommentCreator";
import CommentUpdater from "../comment/CommentUpdater";

export default {
    name: "baby-comments",
    components: { CommentCreator, CommentUpdater },
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
        }),
        ...mapGetters({
            isUserParent: "isUserParent",
            userRoles: "userRoles",
        }),
    },
    methods: {
        async deleteComment(commentId) {
            await this.$store.dispatch("baby/removeComment", {
                commentId: commentId,
                babyId: this.baby.id,
            });
        },
    },
};
</script>
