<template>
    <div>
        <h4 class="subtitle">Comments</h4>
        <ul class="list">
            <li v-for="comment in baby.comments" :key="comment.id">
                <CommentItem :comment="comment" />
            </li>
        </ul>

        <ul class="list" v-if="baby.comments.length < 1">
            <li>Pas de commentaire</li>
        </ul>

        <CommentCreator
            class="mt-8"
            v-if="isUserParent || userRoles.comments.write"
        />
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CommentCreator from "../comment/CommentCreator";
import CommentItem from "../comment/CommentItem";

export default {
    name: "baby-comments",
    components: { CommentCreator, CommentItem },
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
        }),
        ...mapGetters({
            isUserParent: "isUserParent",
            userRoles: "userRoles",
        }),
    },
};
</script>
