<template>
    <div>
        <h2 class="subtitle mt-12 mb-4">Mes bébés</h2>
        <ul class="list clickable mb-8">
            <li
                v-for="baby in user.allBabies"
                :key="baby.id"
                @click="goToBaby(baby.id)"
            >
                <p>{{ baby.name }} - {{ baby.formatedBirth }}</p>
            </li>
        </ul>
        <Accordion ref="accordion" class="p-2 border-t border-b border-gray">
            <template v-slot:title>
                <strong class="subtitle grow">Ajouter un Bébé</strong>
            </template>
            <template v-slot:body>
                <BabyCreator @done="$refs.accordion.toggle()" />
            </template>
        </Accordion>
    </div>
</template>

<script>
import { mapState } from "vuex";
import BabyCreator from "../components/baby/BabyCreator";
import Accordion from "../components/common/Accordion";

export default {
    name: "home-page",
    components: { BabyCreator, Accordion },
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
