<template>
    <div class="flex gap-4 mt-4">
        <input
            type="text"
            class="grow"
            v-model="text"
            placeholder="Commentaire"
        />
        <button icon @click="updateComment" :disabled="ajaxPending">
            <span class="material-icons">done</span>
        </button>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "comment-updater",
    props: ["comment"],
    data: () => {
        return {
            text: "",
            ajaxPending: false,
        };
    },
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
        }),
    },
    beforeMount() {
        this.text = this.comment.text;
    },
    methods: {
        async updateComment() {
            this.ajaxPending = true;
            try {
                await this.$store.dispatch("baby/updateComment", {
                    text: this.text,
                    commentId: this.comment.id,
                    babyId: this.baby.id,
                });
            } catch (e) {
                console.log(e);
            }
            this.ajaxPending = false;
            this.$emit("done");
        },
    },
};
</script>
