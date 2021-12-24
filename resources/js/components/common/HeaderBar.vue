<template>
    <header class="header">
        <div class="main">
            <h4 class="grow title">
                coucou {{ isLogged ? user.name : "new mum" }}
            </h4>
            <router-link to="/" class="subtitle">Accueil</router-link>
            <router-link to="login" class="subtitle ml-4">Login</router-link>
            <button v-if="isLogged" @click="logout">logout</button>
        </div>
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

<style lang="scss" scoped>
.header {
    @apply bg-primary text-white;
}
.main {
    @apply container mx-auto bg-primary text-white flex items-center py-2;
}
</style>
