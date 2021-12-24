<template>
    <div>
        <h5>Add comment</h5>
        <input type="text" v-model="text" placeholder="texte" />
        <button @click="addComment">créer</button>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "comment-creator",
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
    methods: {
        async addComment() {
            try {
                await this.$store.dispatch("baby/addComment", {
                    text: this.text,
                    babyId: this.baby.id,
                });
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>
