<template>
    <div class="flex flex-col gap-8">
        <h1 class="title text-center">Me connecter</h1>
        <input type="text" v-model="email" placeholder="email" />
        <input type="password" v-model="password" placeholder="password" />
        <button @click="login">valider</button>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "user-login",
    data: () => {
        return {
            email: "",
            password: "",
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
    methods: {
        async login() {
            try {
                await this.$store.dispatch("user/logUser", {
                    email: this.email,
                    password: this.password,
                });
                this.$router.push({ name: "home" });
            } catch (e) {
                alert(e);
            }
        },
    },
};
</script>
