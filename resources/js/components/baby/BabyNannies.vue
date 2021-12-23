<template>
    <div>
        <h4>Nannies</h4>
        <div v-if="baby.nannies.length > 0">
            <div v-for="nanny in baby.nannies" :key="nanny.id">
                <div style="display: flex; gap: 1rem">
                    <p>
                        {{ nanny.name }}
                    </p>
                    <button @click="removeNanny(nanny.id)">delete</button>
                </div>
                <NannyUpdater :nanny="nanny" />
            </div>
        </div>
        <div v-if="baby.nannies.length < 1">
            <p>Pas de nannie</p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import NannyUpdater from "../nanny/NannyUpdater";

export default {
    name: "baby-nannies",
    components: { NannyUpdater },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
            baby: (state) => state.baby.baby,
        }),
        ...mapGetters({
            isLogged: "user/isLogged",
        }),
    },
    methods: {
        async removeNanny(nannyId) {
            await this.$store.dispatch("baby/removeNanny", {
                babyId: this.baby.id,
                nannyId: nannyId,
            });
        },
    },
};
</script>
