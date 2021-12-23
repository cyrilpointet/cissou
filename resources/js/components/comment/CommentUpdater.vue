<template>
    <div>
        <h5>Update Comment</h5>
        <input v-model="text" placeholder="email" />
        <button @click="updateComment">valider</button>
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
            try {
                await this.$store.dispatch("baby/updateComment", {
                    text: this.text,
                    commentId: this.comment.id,
                    babyId: this.baby.id,
                });
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
