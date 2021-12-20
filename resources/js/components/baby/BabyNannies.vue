<template>
    <div>
        <h4>Nannies</h4>
        <template v-if="baby.nannies.length > 0">
            <p v-for="nanny in baby.nannies" :key="nanny.id">
                {{ nanny.name }}
            </p>
        </template>
        <div v-if="baby.nannies.length < 1">
            <p>Pas de nannie</p>
        </div>
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
