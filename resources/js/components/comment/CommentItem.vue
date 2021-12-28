<template>
    <EditableAccordion
        ref="accordion"
        @delete="confirmDelete(comment.id)"
        :editable="canEdit"
    >
        <template v-slot:title>
            <div class="grow">
                <p class="caption mb-2 italic">
                    {{ comment.user.name }} - {{ createdDate }}
                </p>
                <p>
                    {{ comment.text }}
                </p>
            </div>
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
import { EventBus } from "../../services/EventBus";

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
        createdDate() {
            return new Date(this.comment.created_at).toLocaleDateString(
                "fr-FR"
            );
        },
    },
    methods: {
        confirmDelete(commentId) {
            EventBus.$emit("openConfirmModal", {
                title: "Supprimer",
                content: "Voulez-vous supprimer le commentaire ?",
                action: () => {
                    this.deleteComment(commentId);
                },
            });
        },
        async deleteComment(commentId) {
            await this.$store.dispatch("baby/removeComment", {
                commentId: commentId,
                babyId: this.baby.id,
            });
        },
    },
};
</script>
