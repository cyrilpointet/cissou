<template>
    <header style="display: flex; gap: 2rem">
        <h4>coucou {{ isLogged ? user.name : "new mum" }}</h4>
        <router-link to="/">Accueil</router-link>
        <router-link to="login">Login</router-link>
        <button v-if="isLogged" @click="logout">logout</button>
    </header>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "header-bar",
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
        ...mapGetters({
            isLogged: "user/isLogged",
        }),
    },
    methods: {
        async logout() {
            await this.$store.dispatch("user/logout");
            this.$router.push({ name: "login" });
        },
    },
};
</script>
