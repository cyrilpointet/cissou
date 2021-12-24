<template>
    <div>
        <h4 class="subtitle">Nannies</h4>
        <ul class="list" v-if="baby.nannies.length > 0">
            <li v-for="nanny in baby.nannies" :key="nanny.id">
                <span class="flex">
                    <p class="grow">
                        {{ nanny.name }}
                    </p>
                    <button
                        icon
                        v-if="isUserParent"
                        @click="removeNanny(nanny.id)"
                    >
                        <span class="material-icons">delete</span>
                    </button>
                </span>

                <NannyUpdater v-if="isUserParent" :nanny="nanny" />
            </li>
        </ul>
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
            isUserParent: "isUserParent",
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
