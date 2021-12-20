<template>
    <div>
        <h5>Update Baby</h5>
        <input type="text" v-model="name" placeholder="Nom" />
        <input
            type="datetime-local"
            v-model="birth"
            :max="new Date().toISOString().slice(0, 16)"
        />
        <button @click="updateBaby">Update</button>
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
            await this.$store.dispatch("baby/updateBaby", {
                name: this.name,
                birth: this.birth,
                id: this.baby.id,
            });
        },
    },
};
</script>
