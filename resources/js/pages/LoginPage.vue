<template>
    <div>
        <Login v-if="hasAccount" />
        <Register v-else />
        <button @click="hasAccount = !hasAccount">
            {{ hasAccount ? "Je n'ai pas de compte" : "J'ai déjà un compte" }}
        </button>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Login from "../components/user/Login";
import Register from "../components/user/Register";

export default {
    name: "login-page",
    components: { Login, Register },
    data: () => {
        return {
            hasAccount: false,
        };
    },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
        ...mapGetters({
            isLogged: "user/isLogged",
        }),
    },
    beforeMount() {
        if (this.isLogged) {
            this.$router.push({ name: "home" });
        }
    },
};
</script>
