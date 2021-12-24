<template>
    <div>
        <h1 class="title mb-4">Home</h1>
        <h2 class="subtitle mb-4">Babies</h2>
        <ul class="list mb-4">
            <li
                v-for="baby in user.allBabies"
                :key="baby.id"
                @click="goToBaby(baby.id)"
            >
                <p>{{ baby.name }} - {{ baby.formatedBirth }}</p>
            </li>
        </ul>
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
