<template>
    <div>
        <h1>Baby</h1>
        <div v-if="baby">
            <p>Nom: {{ baby.name }}</p>
            <p>Né(e) le: {{ baby.formatedBrith }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "baby-page",
    computed: {
        ...mapState({
            user: (state) => state.user.user,
            baby: (state) => state.baby.baby,
        }),
        ...mapGetters({
            isLogged: "user/isLogged",
        }),
    },
    beforeMount() {
        try {
            this.$store.dispatch("baby/getBaby", this.$route.params.id);
        } catch (e) {
            console.log(e);
            this.$router.push({ name: "home" });
        }
    },
};
</script>
