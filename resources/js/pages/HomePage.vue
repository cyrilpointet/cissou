<template>
    <div>
        <h1>Home</h1>
        <h2>Babies</h2>
        <div
            v-for="baby in user.allBabies"
            :key="baby.id"
            @click="goToBaby(baby.id)"
        >
            <p>{{ baby.name }} - {{ baby.formatedBirth }}</p>
        </div>
        <BabyCreator />
    </div>
</template>

<script>
import { mapState } from "vuex";
import BabyCreator from "../components/baby/BabyCreator";

export default {
    name: "home-page",
    components: { BabyCreator },
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
