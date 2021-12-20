<template>
    <div>
        <h4>Nannies</h4>
        <div v-if="baby.nannies.length > 0">
            <div
                v-for="nanny in baby.nannies"
                :key="nanny.id"
                style="display: flex; gap: 1rem"
            >
                <p>
                    {{ nanny.name }}
                </p>
            </div>
        </div>
        <div v-if="baby.nannies.length < 1">
            <p>Pas de nannie</p>
        </div>
        <h4>Ajouter nanny</h4>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "baby-nannies",
    computed: {
        ...mapState({
            user: (state) => state.user.user,
            baby: (state) => state.baby.baby,
        }),
        ...mapGetters({
            isLogged: "user/isLogged",
        }),
    },
};
</script>
