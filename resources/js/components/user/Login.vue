<template>
    <div>
        <h1>Login</h1>
        <input type="text" v-model="email" placeholder="email" />
        <input type="password" v-model="password" placeholder="password" />
        <button @click="login">login</button>
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
