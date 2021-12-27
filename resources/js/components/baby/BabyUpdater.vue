<template>
    <div class="flex flex-col md:flex-row gap-4 items-center">
        <label class="grow w-full md:w-auto"
            >Nom
            <input type="text" v-model="name" placeholder="Nom" />
        </label>
        <label class="grow w-full md:w-auto"
            >Date de naissance
            <input
                type="datetime-local"
                v-model="birth"
                :max="new Date().toISOString().slice(0, 16)"
            />
        </label>
        <button icon @click="updateBaby" class="md:mt-4">
            <span class="material-icons">done</span>
        </button>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "baby-updater",
    data: () => {
        return {
            name: "",
            birth: new Date().toISOString().slice(0, 16),
            ajaxPending: false,
        };
    },
    computed: {
        ...mapState({
            baby: (state) => state.baby.baby,
        }),
    },
    created() {
        this.name = this.baby.name;
        this.birth = new Date(this.baby.birth).toISOString().slice(0, 16);
    },
    methods: {
        async updateBaby() {
            this.ajaxPending = false;
            try {
                await this.$store.dispatch("baby/updateBaby", {
                    name: this.name,
                    birth: this.birth,
                    id: this.baby.id,
                });
                this.$emit("done");
            } catch (e) {
                console.log(e);
            }
            this.ajaxPending = true;
        },
    },
};
</script>
