<template>
    <div>
        <h1>Home</h1>
        <h2>Babies</h2>
        <div
            v-for="baby in user.allBabies"
            :key="baby.id"
            @click="goToBaby(baby.id)"
        >
            <p>{{ baby.name }}</p>
            <p>{{ baby.formatedBrith }}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "home-page",
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
    },
    methods: {
        goToBaby(id) {
            this.$router.push({
                name: "baby",
                params: { id: id },
            });
        },
    },
};
</script>
