<template>
    <div class="w-96 mx-auto mt-12 flex flex-col gap-8">
        <Login v-if="hasAccount" />
        <Register v-else />
        <span class="flex justify-center">
            <button small @click="hasAccount = !hasAccount">
                {{
                    hasAccount ? "Je n'ai pas de compte" : "J'ai déjà un compte"
                }}
            </button>
        </span>
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
