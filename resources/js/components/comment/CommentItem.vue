<template>
    <EditableAccordion
        ref="accordion"
        @delete="deleteComment(comment.id)"
        :editable="canEdit"
    >
        <template v-slot:title>
            <p class="grow">
                {{ comment.text }}
            </p>
        </template>
        <template v-slot:body>
            <CommentUpdater
                @done="$refs.accordion.toggle()"
                :comment="comment"
            />
        </template>
    </EditableAccordion>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CommentUpdater from "./CommentUpdater";
import EditableAccordion from "../common/EditableAccordion";

export default {
    name: "comment-item",
    props: ["comment"],
    components: { CommentUpdater, EditableAccordion },
    data: () => {
        return {
            panelMaxHeight: 0,
        };
    },
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
            user: (state) => state.user.user,
        }),
        ...mapGetters({
            isUserParent: "isUserParent",
            userRoles: "userRoles",
        }),
        canEdit() {
            return this.isUserParent || this.comment.user.id === this.user.id;
        },
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
