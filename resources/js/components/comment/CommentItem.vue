<template>
    <div class="main">
        <div class="flex items-center gap-4">
            <p class="grow">
                {{ this.comment.text }}
            </p>
            <button icon v-if="canEdit" @click="toggleAccordion(comment.id)">
                <span class="material-icons">edit</span>
            </button>
            <button icon v-if="canEdit" @click="deleteComment(comment.id)">
                <span class="material-icons">delete</span>
            </button>
        </div>
        <div class="panel" ref="panel" :style="{ maxHeight: panelMaxHeight }">
            <CommentUpdater
                @done="toggleAccordion"
                v-if="canEdit"
                :comment="comment"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CommentUpdater from "./CommentUpdater";

export default {
    name: "comment-item",
    props: ["comment"],
    components: { CommentUpdater },
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
        toggleAccordion() {
            if (this.panelMaxHeight !== 0) {
                this.panelMaxHeight = 0;
            } else {
                this.panelMaxHeight = this.$refs.panel.scrollHeight + "px";
            }
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

<style lang="scss" scoped>
.main {
    transition: 0.4s;
}
.panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
}
</style>
