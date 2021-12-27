<template>
    <div>
        <h2 class="subtitle mt-12 mb-4">Babies</h2>
        <ul class="list clickable mb-4">
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
