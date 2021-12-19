<template>
    <div>
        <h1>Register</h1>
        <input v-model="name" placeholder="name" />
        <input v-model="email" placeholder="email" />
        <input v-model="password" placeholder="password" />
        <button @click="login">login</button>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "user-register",
    data: () => {
        return {
            name: "",
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
                await this.$store.dispatch("user/createUser", {
                    name: this.name,
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
