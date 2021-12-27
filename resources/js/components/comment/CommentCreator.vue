<template>
    <div>
        <div class="flex gap-4 items-center mt-2">
            <input
                type="text"
                class="grow"
                v-model="text"
                placeholder="texte"
            />
            <button icon @click="addComment" :disabled="ajaxPending">
                <span class="material-icons">done</span>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "comment-creator",
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
    methods: {
        async addComment() {
            this.ajaxPending = true;
            try {
                await this.$store.dispatch("baby/addComment", {
                    text: this.text,
                    babyId: this.baby.id,
                });
                this.text = "";
            } catch (e) {
                console.log(e);
            }
            this.$emit("done");
            this.ajaxPending = false;
        },
    },
};
</script>
